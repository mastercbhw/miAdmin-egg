'use strict';

const BaseController = require('./base');

class ManagerController extends BaseController {
  async index() {
    // 查询用户表， 需要关联角色表
    const list = await this.ctx.model.Admin.aggregate([{
      $lookup: {
        from: 'roles',
        localField: 'role_id',
        foreignField: '_id',
        as: 'rolename',
      },
    }]);

    console.log('TCL: ManagerController -> index -> list', list);
    await this.ctx.render('/admin/manager/index', {
      list,
    });
  }

  async add() {
    // 获取角色
    const roleResult = await this.ctx.model.Role.find();
    await this.ctx.render('/admin/manager/add', {
      roleResult,
    });
  }

  async doAdd() {
    const addResult = this.ctx.request.body;
    const adminResult = await this.ctx.model.Admin.find({ username: addResult.username });

    if (adminResult.length > 0) {
      await this.error('/admin/manager/add', '此管理员已经存在，不能重复添加');
    } else {
      addResult.password = await this.service.tools.md5(addResult.password);

      const admin = this.ctx.model.Admin(addResult);
      admin.save();
      await this.success('/admin/manager', '增加用户成功');
    }
  }

  async edit() {
    await this.ctx.render('/admin/manager/edit');
  }
}

module.exports = ManagerController;
