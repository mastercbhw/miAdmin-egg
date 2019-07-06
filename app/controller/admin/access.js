'use strict';

const BaseController = require('./base');

class AccessController extends BaseController {
  async index() {
    // 1 在accesss中找出 module_id 等于0的数据，（模块）
    const result = await this.ctx.model.Access.aggregate([
      {
        $match: { module_id: '0' },
      },
      {
        $lookup: {
          from: 'accesses',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
    ]);
    console.log('TCL: AccessController -> index -> result', result);

    // 2、让access表和access表关联，找出access表中 module_id等于_id的数据
    await this.ctx.render('/admin/access/index', {
      list: result,
    });
  }

  async add() {
    const moduleList = await this.ctx.model.Access.find({ module_id: '0' });
    await this.ctx.render('/admin/access/add', {
      moduleList,
    });
  }

  async doAdd() {
    const reqBody = this.ctx.request.body;
    const { module_id } = reqBody;
    if (module_id && module_id !== '0') { // 不是菜单 就是操作
      reqBody.module_id = this.app.mongoose.Types.ObjectId(module_id); // 调用mongoose中的方法，转化成ObjectId
    }
    const access = new this.ctx.model.Access(reqBody);
    await access.save();
    await this.success('/admin/access', '增加权限成功');

  }

  async edit() {
    const moduleList = await this.ctx.model.Access.find({ module_id: '0' });
    const id = this.ctx.request.query.id;
    const accessResult = await this.ctx.model.Access.find({ _id: id });

    await this.ctx.render('/admin/access/edit', {
      moduleList,
      data: accessResult[0],
    });
  }

  async doEdit() {
    const id = this.ctx.request.body;
    const editData = this.ctx.request.body;
    if (editData.module_id && editData.module_id !== '0') {
      editData.module_id = this.app.mongoose.Types.ObjectId(editData.module_id);
    }
    await this.ctx.model.Access.updateOne({ _id: id }, editData);
    await this.success('/admin/access', '修改权限成功');
  }

  async delete() {
    this.ctx.body = '权限删除';
  }
}

module.exports = AccessController;
