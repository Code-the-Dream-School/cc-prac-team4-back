const express = require("express");
const app = express();
const cors = require("cors");
const favicon = require("express-favicon");
const logger = require("morgan");

require("express-async-errors");
require("dotenv").config();

const mainRouter = require("./routes/mainRouter.js");
const userRouter = require("./routes/userRouter.js");

const notFoundMiddleware = require("../middleware/not-found.js");
const errorHandlerMiddleware = require("../middleware/error-handler.js");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// routes
app.use("/api/v1", mainRouter);
app.use("/api/v1", userRouter);

module.exports = app;
