'use strict';

const moment = require('moment');

module.exports = {

  /**
   * 调用正常返回数据
   * @param {*} data - 数据
   * @param {*} message - message
   */
  success(data, message = 'OK') {

    this.ctx.body = {
      code: 200,
      message,
      data,
    };
    this.ctx.status = 200;
  },

  /**
   * 处理失败，处理传入的失败原因
   * @param {*} code - code
   * @param {*} message - message
   * @param {*} data - 数据
   */
  fail(code, message, data) {

    this.ctx.body = {
      code,
      message,
      data,
    };
    this.ctx.status = 200;
  },

  /**
   * 生成用户id
   * @return {string} - uid
   */
  uid() {

    let uid = moment().format('YYYYMMDDHHmmssSSS');
    uid += (Array(3).join(0) + Math.random() * 100).slice(-3);
    return uid;
  },
};
