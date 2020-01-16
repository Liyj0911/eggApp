/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1578539350791_5889';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 参数校验配置
  config.validate = {
    convert: true,
  };

  // mysql配置
  config.mysql = {
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '17741224073',
      // 数据库名
      database: 'goppy',
      // 字符集
      charset: 'utf8mb4',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // jwt密钥
  config.jwt = {
    secret: config.keys,
  };

  // 允许跨域
  config.cors = {
    origin: 'http://localhost:8080',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };

  // socket.io
  config.io = {
    init: {},
    namespace: {
      '/': {
        connectionMiddleware: [ 'auth' ],
        packetMiddleware: [],
      },
    },
    redis: {
      host: '182.92.162.195',
      port: 6379,
      auth_pass: '17741224073',
      db: 0,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
