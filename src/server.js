require('dotenv').config();
const { PORT = 8000 } = process.env;
const app = require('./app');

//database
const connectDB = require('./db/connect');

const listener = () => console.log(`Listening on Port ${PORT}!`);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, listener);
  } catch (error) {
    console.log(error);
  }
};

start();
