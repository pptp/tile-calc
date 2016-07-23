var webpackCfg = require('./webpack.config');

// Set node environment to testing
process.env.NODE_ENV = 'test';

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [ 'PhantomJS' ],
    files: [
      'test/loadtests.js'
    ],
    port: 8000,
    captureTimeout: 60000,
    frameworks: [ 'mocha', 'chai' ],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: [ 'mocha', 'coverage' ],
    preprocessors: {
      'test/loadtests.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        /*{ type: 'lcov', subdir: 'report-lcov' },*/
        { type: 'text', subdir: 'report-text' }
      ],
      instrumenterOptions: {
        istanbul: { noCompact:true }
      }
    },
    // logLevel: config.LOG_DEBUG,
    // captureConsole: true,
    // mocha: {
    //   bail: true
    // }
  });
};
