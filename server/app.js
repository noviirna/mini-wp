require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const morgan = require("morgan");
const mongoose = require("mongoose");

const routes = require("./routes/index");
const errHandler = require("./helpers/errHandler");

if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "testing"
) {
  const cors = require("cors");
  app.use(cors());
}

app.use(morgan("short"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);
app.use(errHandler);

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(connected => {
    console.log("db connected");
  })
  .catch(errors => {
    console.log(JSON.stringify(errors, null, 2));
  });

if (process.env.NODE_ENV === "testing") {
  module.exports = app;
} else {
  app.listen(port, () => {
    console.log("listening to ", port);
  });
}

/** 
  npm init -y
  npm install mongoose express dotenv bcryptjs jsonwebtoken cors morgan --save
  npm install axios --save
  npm install google-auth-library --save
  npm install @google-cloud/storage multer --save
*/
