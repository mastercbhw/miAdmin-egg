'use strict';

const Service = require('egg').Service;
const url = require('url');

class AdminService extends Service {
  async checkAuth() {
    // true有权限 false没有权限
    /**
     * 获取当前用户的角色
     * 根据角色获取当前角色的权限列表
     * 获取当前访问的url对应的权限Id
     * 判断当前访问的url对应的权限id 是否在权限列表的id中
     */
    // 获取当前访问的url
    const pathname = url.parse(this.ctx.request.url).pathname;
    console.log('TCL: AdminService -> checkAuth -> pathname', pathname);

    // 获取当前用户的角色
    const userinfo = this.ctx.session.userinfo;

    const role_id = userinfo.role_id;
    // 忽略权限判断的地址 is_super 表示管理员
    const ignoreUrl = [ '/admin/login', '/admin/doLogin', '/admin/verify', '/admin/logout' ];

    if (ignoreUrl.includes(pathname) || userinfo.is_super === 1) {
      return true;
    }


    // 根据角色获取当前的权限列表
    const accessResult = await this.ctx.model.RoleAccess.find({ role_id });

    const assessArray = [];

    accessResult.forEach(value => {
      assessArray.push(value.access_id.toString());
    });


    const accessUrlReault = await this.ctx.model.Access.find({ url: pathname });
    console.log('TCL: AdminService -> checkAuth -> accessUrlReault', accessUrlReault);

    if (accessUrlReault.length > 0 && assessArray.length > 0 && assessArray.includes(accessUrlReault[0]._id.toString())) {
      return true;
    }
    return false;
  }

  async getAuthList(role_id) {
    /**
     * 获取全部的权限
     * 查询当前角色拥有的权限（查询当前角色的权限id），把查找到的数据放到数组中
     * 循环遍历所有的全线数据 判断当前角色是否在角色权限的数组中
     */

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

    return result;
  }
}

module.exports = AdminService;
