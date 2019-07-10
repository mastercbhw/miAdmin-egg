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
    const roleResult = await this.ctx.model.Role.find();
    const id = this.ctx.request.query.id;
    const adminResult = await this.ctx.model.Admin.find({ _id: id });
    await this.ctx.render('/admin/manager/edit', {
      roleResult,
      adminResult: adminResult[0],
    });
  }

  async doEdit() {
    const addResult = this.ctx.request.body;
    // 如果password为空，则不修改密码，如果password存在，则修改密码
    const { id, password, mobile, email, role_id } = addResult;
    if (password) {
      await this.ctx.model.Admin.updateOne({ _id: id }, {
        mobile,
        email,
        role_id,
        password: await this.ctx.service.tools.md5(password),
      });
    } else {
      await this.ctx.model.Admin.updateOne({ _id: id }, {
        mobile,
        email,
        role_id,
      });
    }

    await this.success('/admin/manager', '修改成功');
  }
}

module.exports = ManagerController;
