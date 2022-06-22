const router = require("koa-router")();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/api/user");

router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body;
  // 查询登录是否成功
  const data = await login(username, password);
  if (data.username) {
    // 设置 session
    ctx.session.username = data.username;
    ctx.session.realName = data.realname;
    ctx.body = new SuccessModel("登录成功");
  } else {
    ctx.body = new ErrorModel("登录失败");
  }
});

module.exports = router;
