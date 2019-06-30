'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
  async index() {
    await this.ctx.render('/admin/login');
  }
  async doLogin() {
    await this.success('/admin/login');
  }
}

module.exports = LoginController;
