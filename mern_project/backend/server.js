require("dotenv").config()

const express = require("express");
const app = express();
const path = require("path");

const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// for the default page of our app, use resources from the /public folder on our system
// powered by express - __dirname gives the absolute path
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));

app.use("/auth", require("./routes/authRoutes"));

app.use("/users", require("./routes/userRoutes"));

app.use("/notes", require("./routes/noteRoutes"));

// 404 page handling for invalid routes
app.all("*", (req, res) => {
    res.status(404);

    // if html request, show html page
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    // if from json, send 404 response
    } else if (req.accepts("json")) {
        res.json({
            message: "404 Not Found",
        });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.use(errorHandler);

// runs upon connection opened to the database
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// runs upon error encountered with databasse connection
mongoose.connection.on("error", err => {
    console.log(err);
    logEvents(
        `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        "mongoErrLog.log",
    );
})