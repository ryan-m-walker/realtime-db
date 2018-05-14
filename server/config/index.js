const path = require('path');

const config = {
  dev: 'development',
  prod: 'production',
  port: process.env.PORT || 3000,
  publicPath: path.join(__dirname, '../../client/public')
};

const env = process.env.NODE_ENV || config.dev;
process.env.NODE_ENV = env;

const envConfig = require(`./${env}`);

module.exports = {
  ...config,
  ...envConfig
};
