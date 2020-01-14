'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  /**
   * 注册Service
   * @param {Object} user - 用户信息
   * @return {Promise<boolean>} - 是否成功
   */
  async register(user) {

    const { app } = this;
    const hasUser = await app.mysql.get('user', { username: user.username });
    if (hasUser) {
      return false;
    }
    const result = await app.mysql.insert('user', user);
    // 判断插入成功
    return result.affectedRows === 1;
  }

  /**
   * 登录Service
   * @param {Object} user - 用户信息
   * @return {Promise<boolean|*>} - 是否成功
   */
  async login(user) {

    const { app } = this;
    const result = await app.mysql.get('user', { username: user.username });
    if (!result || user.password !== result.password) {
      return false;
    }
    return result;
  }
}

module.exports = UserService;
