'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 后台管理
  // 管理员
  router.get('/admin/manager', controller.admin.manager.index);
  router.get('/admin/add', controller.admin.manager.add);
  router.get('/admin/edit', controller.admin.manager.edit);

  // 角色管理
  router.get('/role/manager', controller.admin.role.index);
  router.get('/role/add', controller.admin.role.add);
  router.get('/role/edit', controller.admin.role.edit);
  router.get('/role/delete', controller.admin.role.delete);

  // 权限管理
  router.get('/access/manager', controller.admin.access.index);
  router.get('/access/add', controller.admin.access.add);
  router.get('/access/edit', controller.admin.access.edit);
  router.get('/access/delete', controller.admin.access.delete);
};
