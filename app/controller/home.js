'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = { code: 200 };
  }

  async test() {
    const { ctx } = this;
    console.log('解密数据', ctx.state);
    ctx.helper.success(ctx.state);
  }
}

module.exports = HomeController;
