'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {

    try {
      await next();
    } catch (err) {
      console.error('[全局统一异常]', err);
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);
      // status 如果没有,则统一为500
      const status = err.status || 500;
      // 如果是500错误，且是生产环境，则统一显示“Internal Server Error”
      const error = status === 500 && ctx.app.config.env === 'prod' ? 'Internal Server Error' : err;
      switch (status) {
        case 401:
          ctx.helper.fail(401, '登录超时，请重新登录');
          break;
        case 422:
          ctx.helper.fail(422, '参数错误');
          break;
        default:
          ctx.helper.fail(400, error.message, error);
          break;
      }
    }
  };
};
