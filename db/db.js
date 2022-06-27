const mongoose = require("mongoose");

const url = "mongodb://localhost:27017";
const dbName = "myblog";

mongoose.connect(`${url}/${dbName}`);

const db = mongoose.connection;

// 发生错误
db.on("error", (error) => {
  console.error(error);
});

module.exports = mongoose;