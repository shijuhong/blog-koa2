const { exec, escape } = require("../db/mysql");
const User = require("../models/User");
const { genPassword } = require("../utils/cryp");

// const login = async (username, password) => {
//   username = escape(username);
//   // 生成加密密码
//   password = genPassword(password);
//   password = escape(password);

//   const sql = `
//     select username, realname from users where
//     username = ${username} and password = ${password};
//   `;
//   const rows = await exec(sql)
//   return rows[0] || {}
// };

const login = async (username, password) => {
  // 生成加密密码
  password = genPassword(password);

  // find 返回的是数组
  const userList = await User.find({
    username,
    password,
  });

  if (userList === 0) return {};
  return userList[0];
};

module.exports = {
  login,
};
