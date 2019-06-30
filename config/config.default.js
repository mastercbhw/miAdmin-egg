/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1561869819081_3159';

  // add your middleware config here
  config.middleware = [
    'adminauth',
  ];

  config.adminauth = {
    match: '/admin',
  };

  // 模板引擎
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };

  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/eggmi',
    optoins: {},
  };

  return {
    ...config,
    ...userConfig,
  };
};
