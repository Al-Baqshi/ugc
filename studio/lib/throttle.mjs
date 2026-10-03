// Failed-login throttle, held in memory. Keys are client IPs (see clientIp in
// server.mjs for which IP is trusted). Kept separate so check.mjs can test it
// with a fake clock.

export function createThrottle({
  windowMs = 15 * 60 * 1000,
  limit = 30, // failures per key per window before 429
  maxTracked = 5000, // keys remembered at once
  slowAfter = 300, // failures from all keys in one window before every failure is slowed
  now = Date.now,
} = {}) {
  const failures = new Map(); // key -> { n, first }, ordered by window start
  const all = { n: 0, first: 0 };

  function expired(f, t) {
    return t - f.first > windowMs;
  }

  function evict(t) {
    // Expired windows sit at the front of the map.
    for (const [k, f] of failures) {
      if (!expired(f, t)) break;
      failures.delete(k);
    }
    if (failures.size <= maxTracked) return;
    // Over capacity: drop keys that are not locked out, oldest first, so a flood
    // of new keys can never wipe the lockouts that matter.
    for (const [k, f] of failures) {
      if (failures.size <= maxTracked) return;
      if (f.n < limit) failures.delete(k);
    }
    for (const k of failures.keys()) {
      if (failures.size <= maxTracked) return;
      failures.delete(k);
    }
  }

  return {
    isLockedOut(key) {
      const f = failures.get(key);
      if (!f) return false;
      if (expired(f, now())) {
        failures.delete(key);
        return false;
      }
      return f.n >= limit;
    },

    noteFailure(key) {
      const t = now();
      const f = failures.get(key);
      if (!f || expired(f, t)) {
        failures.delete(key); // re-insert so the map stays ordered by window start
        failures.set(key, { n: 1, first: t });
      } else f.n++;
      evict(t);
      if (t - all.first > windowMs) Object.assign(all, { n: 0, first: t });
      all.n++;
    },

    /** True during a wide attack (many keys): the server then slows every failed login. */
    slow() {
      return all.n > slowAfter && now() - all.first <= windowMs;
    },

    size: () => failures.size,
  };
}
