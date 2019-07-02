'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  async index() {
    const result = await this.ctx.model.Role.find();
    await this.ctx.render('/admin/role/index', {
      list: result,
    });
  }

  async add() {
    await this.ctx.render('/admin/role/add');
  }

  async edit() {
    const id = this.ctx.query.id;
    console.log('TCL: RoleController -> edit -> id', id);
    const result = await this.ctx.model.Role.find({ _id: id });
    console.log('TCL: RoleController -> edit -> result', result);

    await this.ctx.render('/admin/role/edit', {
      list: result[0],
    });
  }

  async delete() {
    this.ctx.body = '角色删除';
  }

  async doAdd() {
    // console.log(this.ctx.request.body);
    const role = new this.ctx.model.Role({
      title: this.ctx.request.body.title,
      description: this.ctx.request.body.description,
    });

    await role.save(); // save入库
    await this.success('/admin/role', '角色增加成功');
  }

  async doEdit() {
    console.log(this.ctx.request.body);
    const _id = this.ctx.request.body._id;
    const title = this.ctx.request.body.title;
    const description = this.ctx.request.body.description;
    const result = await this.ctx.model.Role.updateOne({ _id }, {
      title,
      description,
    });
    if (result) {
      await this.success('/admin/role', '角色修改成功');

    } else {
      await this.error('/admin/role', '角色修改失败');
    }
  }
}

module.exports = RoleController;
