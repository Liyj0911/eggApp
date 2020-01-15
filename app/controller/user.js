'use strict';

const Controller = require('egg').Controller;
const assert = require('assert');

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

  /**
   * 注册
   * @return {Promise<void>}
   */
  async register() {

    const { ctx, service } = this;
    ctx.validate(createRule, ctx.request.body);
    const { username, password } = ctx.request.body;
    const nowTime = new Date();
    const user = {
      uid: ctx.helper.uid(),
      username,
      password,
      createTime: nowTime,
      updateTime: nowTime,
    };
    const result = await service.user.register(user);
    assert(result, '用户名已存在');
    ctx.helper.success();
  }

  /**
   * 登录
   * @return {Promise<void>}
   */
  async login() {

    const { ctx, service } = this;
    ctx.validate(createRule, ctx.request.body);
    const result = await service.user.login(ctx.request.body);
    assert(result, '用户名或密码错误');
    ctx.helper.success(result);
  }
}

module.exports = UserController;
