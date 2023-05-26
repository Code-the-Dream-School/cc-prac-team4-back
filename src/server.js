const { PORT = 8000 } = process.env;
const app = require("./app");
const connectDB = require("../db/connect");
require("dotenv").config();

//server

//const listener = () => console.log(`Listening on Port ${PORT}!`);
//app.listen(PORT, listener);

//const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
