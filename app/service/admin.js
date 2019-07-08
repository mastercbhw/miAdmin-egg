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
}

module.exports = AdminService;
