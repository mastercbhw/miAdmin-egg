// 登录权限判断
'use strict';

const url = require('url');

module.exports = () => {
  return async function adminauth(ctx, next) {
    const pathname = url.parse(ctx.request.url).pathname;

    ctx.state.csrf = ctx.csrf;
    ctx.state.prevPage = ctx.request.headers.referer;
    /**
     * 用户没有登录就跳转到登录页面
     * 只有登录以后才能放问后台管理系统
     */
    if (ctx.session.userinfo) {
      ctx.state.userinfo = ctx.session.userinfo;
      await next();
    } else {
      // 排除不需要登录的页面
      if (pathname === '/admin/login' || pathname === '/admin/doLogin' || pathname === '/admin/verify') {
        await next();
      } else {
        ctx.redirect('/admin/login');
      }
    }
  };
};
