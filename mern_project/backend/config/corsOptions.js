const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
    origin: (origin, callback) => {
        // only allow accepted sites to access API
        // no origin = services such as postman, or our local network
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // null = no error, true = let the site do its thing
            callback(null, true);
        } else {
            callback(new Error("API access disallowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

module.exports = corsOptions;