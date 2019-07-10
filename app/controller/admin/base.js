/**
 * @file 父类
 */
'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl, message = '') {
    await this.ctx.render('/admin/public/success', {
      redirectUrl,
      message,
    });
  }
  async error(redirectUrl, errorMessage) {
    await this.ctx.render('/admin/public/error', {
      redirectUrl,
      errorMessage,
    });
  }

  async createImgCode() {
    const captcha = await this.service.tools.captcha();
    this.ctx.response.type = 'svg'; // 指定返回的类型
    this.ctx.body = captcha.data;
  }

  // 封装一个删除方法
  async delete() {
    /**
     * 需要删除数据库的表
     * 获取要删除的数据的id
     * 执行删除
     * 返回以前的页面 ctx.request.headers['referer'] 上一页的地址
     */
    const model = this.ctx.request.query.model;
    const id = this.ctx.request.query.id;
    await this.ctx.model[model].deleteOne({
      _id: id,
    });
    this.ctx.redirect(this.ctx.state.prevPage);
  }

  async changeStatus() {

    // 数据库表Model 更新的属性 更新的Id
    const { model, attr, id } = this.ctx.request.query;
    console.log('TCL: changeStatus -> id', id);
    console.log('TCL: changeStatus -> attr', attr);
    console.log('TCL: changeStatus -> model', model);
    const result = await this.ctx.model[model].find({ _id: id });
    console.log('TCL: BaseController -> changeStatus -> result', result);
    if (result.length > 0) {
      let json = {};
      if (result[0][attr] === 1) {
        json = {
          [attr]: 0,
        };
      } else {
        json = {
          [attr]: 1,
        };
      }
      const updateResult = await this.ctx.model[model].updateOne({ _id: id }, json);
      console.log('TCL: BaseController -> changeStatus -> updateResult', updateResult);
      if (updateResult) {
        this.ctx.body = { message: '更新成功', success: true };
      } else {
        this.ctx.body = { message: '更新失败', success: false };
      }
    } else {
      this.ctx.body = { message: '更新失败，参数错误', success: false };
    }
  }
}

module.exports = BaseController;
