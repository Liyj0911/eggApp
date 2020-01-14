'use strict';

const Controller = require('egg').Controller;

// 定义请求参数的验证规则
const createRule = {
  username: {
    type: 'string',
    required: true,
    max: 16,
  },
  password: {
    type: 'string',
    required: true,
    min: 4,
    max: 16,
  },
};

class UserController extends Controller {

  async register() {

    const { ctx, service, app } = this;
    ctx.validate(createRule, ctx.request.body);
    const { username, password } = ctx.request.body;
    const nowTime = new Date();
    const user = {
      uid: ctx.helper.uid(),
      username,
      password,
      create_time: nowTime,
      update_time: nowTime,
    };
    const result = await service.user.register(user);
    if (result) {
      // 生成 token 的方式
      ctx.helper.success();
    } else {
      ctx.helper.fail(400, '用户名已存在');
    }
  }

  async login() {

    const { ctx, service, app } = this;
    ctx.validate(createRule, ctx.request.body);
    const result = await service.user.login(ctx.request.body);
    if (result) {
      // 生成token
      const token = app.jwt.sign({ uid: result.uid }, app.config.jwt.secret, { expiresIn: '7d' });
      delete result.password;
      result.token = token;
      ctx.helper.success(result);
    } else {
      ctx.helper.fail(400, '用户名或密码错误');
    }
  }
}

module.exports = UserController;
