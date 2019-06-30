'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  async index() {
    await this.ctx.render('/admin/manager/index', {
      username: '张三',
    });
  }

  async add() {
    await this.ctx.render('/admin/manager/add');
  }

  async edit() {
    await this.ctx.render('/admin/manager/edit');
  }
}

module.exports = ManagerController;
