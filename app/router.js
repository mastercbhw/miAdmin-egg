'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 后台管理
  router.get('/admin/login', controller.admin.login.index); // 登录页面
  router.post('/admin/doLogin', controller.admin.login.doLogin); // 登录接口
  router.get('/admin/logout', controller.admin.login.logout); // 退出登录接口
  router.get('/admin/verify', controller.admin.base.createImgCode); // 验证码
  router.get('/admin/delete', controller.admin.base.delete); // 删除方法
  router.get('/admin/changeStatus', controller.admin.base.changeStatus);


  // 管理员
  router.get('/admin/manager', controller.admin.manager.index);
  router.get('/admin/manager/add', controller.admin.manager.add);
  router.post('/admin/manager/doAdd', controller.admin.manager.doAdd);
  router.get('/admin/manager/edit', controller.admin.manager.edit);
  router.post('/admin/manager/doEdit', controller.admin.manager.doEdit);

  // 角色管理
  router.get('/admin/role', controller.admin.role.index);
  router.get('/admin/role/add', controller.admin.role.add);
  router.get('/admin/role/edit', controller.admin.role.edit);
  router.get('/admin/role/delete', controller.admin.role.delete);
  router.post('/admin/role/doAdd', controller.admin.role.doAdd);
  router.post('/admin/role/doEdit', controller.admin.role.doEdit);
  router.post('/admin/role/doAuth', controller.admin.role.doAuth);
  router.get('/admin/role/auth', controller.admin.role.auth);

  // 权限管理
  router.get('/admin/access', controller.admin.access.index);
  router.get('/admin/access/add', controller.admin.access.add);
  router.post('/admin/access/doAdd', controller.admin.access.doAdd);
  router.post('/admin/access/doEdit', controller.admin.access.doEdit);
  router.get('/admin/access/edit', controller.admin.access.edit);
  router.get('/admin/access/delete', controller.admin.access.delete);
};
