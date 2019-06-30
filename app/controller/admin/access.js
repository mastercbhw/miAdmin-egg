'use strict';

const BaseController = require('./base');

class AccessController extends BaseController {
  async index() {
    await this.ctx.render('/admin/access/index');
  }

  async add() {
    await this.ctx.render('/admin/access/add');
  }

  async edit() {
    await this.ctx.render('/admin/access/edit');
  }

  async delete() {
    this.ctx.body = '权限删除';
  }
}

module.exports = AccessController;
