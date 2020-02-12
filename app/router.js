'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt, io } = app;
  // 用于前端获取csrfToken
  router.get('/csrf', controller.home.index);
  // 注册
  router.post('/register', controller.user.register);
  // 登录
  router.post('/login', controller.user.login);
  // 测试解密token
  router.get('/test', jwt, controller.home.test);
};
