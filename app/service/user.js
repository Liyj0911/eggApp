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
   * @return {Promise<boolean|*>}
   */
  async login(user) {

    const { app } = this;
    const userInfo = await app.mysql.get('user', { username: user.username });
    if (!userInfo || user.password !== userInfo.password) {
      return false;
    }
    const nowTime = new Date();
    // 更新最后一次登录时间
    const result = await app.mysql.update('user', { lastLoginTime: nowTime }, {
      where: {
        uid: userInfo.uid,
      },
    });
    if (result.affectedRows !== 1) {
      return false;
    }
    delete userInfo.password;
    userInfo.lastLoginTime = nowTime;
    // 生成token
    userInfo.token = app.jwt.sign({ userInfo }, app.config.jwt.secret, { expiresIn: '7d' });
    return userInfo;
  }
}

module.exports = UserService;
