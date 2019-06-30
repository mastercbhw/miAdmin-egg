'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
  async index() {
    await this.ctx.render('/admin/login');
  }

  // 登录接口
  async doLogin() {
    console.log(this.ctx.request.body);
    const username = this.ctx.request.body.username;
    // 对密码进行md5加密
    const password = await this.ctx.service.tools.md5(this.ctx.request.body.password);
    const verify = this.ctx.request.body.verify;

    // 判断验证码是否相同
    if (this.ctx.session.code.toLowerCase() === verify.toLowerCase()) { // 验证正确，
      // 进行数据查询
      const result = await this.ctx.model.Admin.find({ username, password });

      if (result.length) { // 登录成功
        this.ctx.session.userinfo = result[0];
        this.ctx.redirect('/admin/manager');
      } else {
        await this.error('/admin/login', '用户名或密码错误');
      }
    } else {
      await this.error('/admin/login', '验证码错误');
    }
  }

  // 退出登录
  async logout() {
    this.ctx.session.userinfo = null;
    this.ctx.redirect('/admin/login');
  }
}

module.exports = LoginController;
