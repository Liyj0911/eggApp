'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async test() {
    const { ctx } = this;
    ctx.helper.success(ctx.state);
  }
}

module.exports = HomeController;
