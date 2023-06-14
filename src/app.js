require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const favicon = require('express-favicon');
const logger = require('morgan');

require('dotenv').config();
const cookieParser = require('cookie-parser');

//app

const mainRouter = require('./routes/mainRouter.js');
const userRouter = require('./routes/userRouter.js');
const authRouter = require('./routes/authRouter.js');
const petRouter = require('./routes/petRoutes.js');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser(process.env.JWT_SECRET));

// routes middleware
app.use('/api/v1', mainRouter);

app.use('/api/v1', userRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1/pets', petRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
