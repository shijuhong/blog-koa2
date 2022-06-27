// 对应 user 集合
const mongoose = require("../db/db");

// 用 Schema 定义数据规范
const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // 必填项
      unique: true, // 唯一，不能重复
    },
    password: String,
    realname: String,
  },
  {
    // 添加时间戳
    timestamps: true,
  }
);

// Model 对应 collection
// mongoose 会自动变复数，对应到 users 集合
// 同时，如果不存在此集合，mongoose 会帮忙生成集合
const User = mongoose.model("user", UserSchema);

module.exports = User;
