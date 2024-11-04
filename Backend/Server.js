const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const port = 3000;
require("./src/config/db.js");
const cors = require("cors");

// for all origin
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, origin);
  },
  credentials: true,
};


app.use(cors(corsOptions));
const Societyroute = require("./src/routes/societyroute.js")

app.use("/api/society",Societyroute)


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port} 👍👍👍 !`))