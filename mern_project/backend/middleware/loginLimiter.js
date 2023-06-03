const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5, // 5 requests per IP per window per minute
    message: {
        message: "Too many login requests from this IP. Please try again in 60 seconds."
    },
    handler: (req, res, next, options) => {
        logEvents(`Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errLog.log");
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true, 
    legacyHeaders: false,
});

module.exports = loginLimiter;