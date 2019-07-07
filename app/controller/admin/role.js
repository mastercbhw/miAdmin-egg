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

  async auth() {
    const role_id = this.ctx.request.query.id;

    const result = await this.ctx.model.Access.aggregate([
      {
        $lookup: {
          from: 'accesses',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
      {
        $match: {
          module_id: '0',
        },
      },
    ]);
    console.log('TCL: auth -> result', result);

    // 查询当前角色所拥有的权限（查询当前角色的权限id） 把查找到的数据放到数据中
    const accessResult = await this.ctx.model.RoleAccess.find({ role_id });
    const roleAccessArray = [];
    accessResult.forEach(_ => { roleAccessArray.push(_.access_id.toString()); });

    // 循环遍历所有的权限数据，判断当前权限是否在角色权限的数组中
    result.forEach(warp => {
      if (roleAccessArray.includes(warp._id.toString())) {
        warp.checked = true;
      }
      warp.items.forEach(item => {
        if (roleAccessArray.includes(item._id.toString())) {
          item.checked = true;
        }
      });
    });


    console.log('TCL: auth -> result', result);


    await this.ctx.render('/admin/role/auth', {
      role_id,
      list: result,
      roleAccessArray,
    });
  }

  async doAuth() {
    /**
     * 首先删除当前角色下的所有权限
     * 然后添加新的权限
     */
    const data = this.ctx.request.body;
    const role_id = data.role_id;
    const access_node = data.access_node;

    await this.ctx.model.RoleAccess.deleteMany({ role_id });

    // 给role_access库增加数据
    access_node.forEach(item => {
      const roleAccessData = new this.ctx.model.RoleAccess({
        role_id,
        access_id: item,
      });
      roleAccessData.save();
    });

    await this.success(`/admin/role?id=${role_id}`, '授权成功');
  }
}

module.exports = RoleController;
