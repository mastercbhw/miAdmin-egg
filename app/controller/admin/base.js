/**
 * @file 父类
 */
'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl) {
    await this.ctx.render('/admin/public/success', {
      redirectUrl,
    });
  }
  async error(redirectUrl, errorMessage) {
    await this.ctx.render('/admin/public/error', {
      redirectUrl,
      errorMessage,
    });
  }

  async createImgCode() {
    const captcha = await this.service.tools.captcha();
    this.ctx.response.type = 'svg'; // 指定返回的类型
    this.ctx.body = captcha.data;
  }
}

module.exports = BaseController;
