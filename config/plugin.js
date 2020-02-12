'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
  },
  // 跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 参数校验
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // mysql
  mysql: {
    enable: false,
    package: 'egg-mysql',
  },
  // token
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};
