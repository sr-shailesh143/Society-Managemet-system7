const { default: mongoose } = require("mongoose");

exports.db = mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB 👌👌👌");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
