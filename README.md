# mi-admin

仿小米商城后台管理系统

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org


### 数据库相关

mongoDB  数据库名称为 eggmi


### RBAC实现流程

- 实现角色的增加修改删除
- 实现用户的增加修改删除，增加修改用户的时候需要选择角色
- 实现权限的增加修改删除
- 实现角色授权功能
- 判断当前登录的用户是否有访问菜单的权限
- 根据当前登录账户的角色信息动态显示左侧菜单
