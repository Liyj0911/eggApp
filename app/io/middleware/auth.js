'use strict';

module.exports = () => {
  return async (ctx, next) => {
    console.log('============================================================', 111);
    await next();
  };
};
