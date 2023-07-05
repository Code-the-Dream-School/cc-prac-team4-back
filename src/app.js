require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const favicon = require('express-favicon');
const logger = require('morgan');

require('dotenv').config();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

//security
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

//app

const mainRouter = require('./routes/mainRouter.js');
const userRouter = require('./routes/userRouter.js');
const authRouter = require('./routes/authRouter.js');
const petRouter = require('./routes/petRoutes.js');
const favoriteRouter = require('./routes/favoriteRoutes.js');
const searchRouter = require('./routes/searchRoutes.js');
const additionalRouter = require('./routes/additionalRouter.js');
const stripeRouter = require('./routes/stripeRouter.js');
const adoptionRouter = require('./routes/adoptionRouter.js')

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(
  rateLimiter({
    windowMs: 60 * 1000, // 15 minutes
    max: 100, // each IP is limited to make 100 requests per windowMs
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload());

// routes middleware
app.use('/api/v1', mainRouter);

app.use('/api/v1', userRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1/pets', petRouter);
app.use('/api/v1/favorites', favoriteRouter);
app.use('/api/v1', searchRouter);
app.use('/api/v1', additionalRouter);
app.use('/api/v1/stripe', stripeRouter);
app.use('/api/v1', adoptionRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
