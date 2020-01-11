'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 用于前端获取csrfToken
  router.get('/csrf', controller.home.index);
  // 注册
  router.post('/register', controller.user.register);
};
