'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const md5 = require('md5');


class ToolsService extends Service {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966',
    });
    this.ctx.session.code = captcha.text; // 验证码上面的文字信息
    return captcha;
  }

  async md5(str) {
    return md5(str);
  }
}

module.exports = ToolsService;
