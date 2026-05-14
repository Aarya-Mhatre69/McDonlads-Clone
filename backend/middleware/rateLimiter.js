const rateLimit = require("express-rate-limit");

const defaults = {
  standardHeaders: true,
  legacyHeaders:   false,
  handler: (req, res) =>
    res.status(429).json({ success: false, message: "Too many requests. Please try again later." }),
};

// 100 req / 15 min — applied globally
const globalLimiter = rateLimit({ ...defaults, windowMs: 15 * 60 * 1000, max: 100 });

// 10 req / 15 min — auth endpoints
const authLimiter = rateLimit({ ...defaults, windowMs: 15 * 60 * 1000, max: 10,
  message: undefined,
  handler: (req, res) =>
    res.status(429).json({ success: false, message: "Too many login attempts. Please wait 15 minutes." }),
});

// 5 orders / min — order creation
const orderLimiter = rateLimit({ ...defaults, windowMs: 60 * 1000, max: 5,
  handler: (req, res) =>
    res.status(429).json({ success: false, message: "Too many order requests. Please slow down." }),
});

module.exports = { globalLimiter, authLimiter, orderLimiter };
