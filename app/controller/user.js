'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    console.log('[请求体]', ctx.request.body);
    ctx.body = { code: 200, data: '123' };
  }
}

module.exports = UserController;
