'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  // 登录
  router.post('/login', controller.user.login);
  // 测试解密token
  router.get('/test', jwt, controller.home.test);
};
