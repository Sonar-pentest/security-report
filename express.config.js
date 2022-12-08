const express = require('express');
const hidePoweredBy = require('hide-powered-by');
const helmet = require('helmet');
const { correctlyConfigS5689, createExpressApp, ClassApp } = require('./express.config.crossfile.js');
const csrf = require('csurf');

const config_options = {
  defaultcsp: 'sensitive', // we want to test XSS vulnerabilities on this vulnerable by design app
  cspframe: 'compliant',
  mixedcontent: 'compliant',
  nosniff: 'sensitive', // if no 'Content-Type' header is set in the response, this header will prevent XSS vulnerabilities
  referrerpolicy: 'compliant',
  expectct: 'compliant',
  hsts: 'compliant',
  dnsprefetch: 'compliant',
  nocache: 'compliant',
  hidepoweredby: 'compliant',
  csrfglobalprotection: 'sensitive',
};

module.exports.init = function (app) {
  if (config_options.defaultcsp === 'sensitive') {
    app.use(csrf({ cookie: true, ignoreMethods: ['POST', 'GET'] })); // Sensitive S4502: POST method is ignored (not protected)
  } else {
    app.use(csrf({ cookie: true, ignoreMethods: ['GET'] })); // Compliant S4502
    // or
    app.use(csrf({ cookie: true })); // Compliant S4502: by default it is good
  }

  let config = {};
  if (config_options.defaultcsp === 'sensitive') {
    config.contentSecurityPolicy = false;
  }

  if (config_options.cspframe === 'sensitive') {
    config.contentSecurityPolicy = false;
  }

  if (config_options.mixedcontent === 'sensitive') {
    config.contentSecurityPolicy = false;
  }

  if (config_options.nosniff === 'sensitive') {
    config.noSniff = false;
  }

  if (config_options.referrerpolicy === 'sensitive') {
    config.referrerPolicy = false;
  }

  if (config_options.expectct === 'sensitive') {
    config.expectCt = false;
  }

  if (config_options.hsts === 'sensitive') {
    config.hsts = false;
  }

  if (config_options.dnsprefetch === 'sensitive') {
    config.dnsPrefetchControl = false;
  }

  if (config_options.nocache === 'sensitive') {
    // sensitive by default
  }

  if (config_options.hidepoweredby === 'sensitive') {
    config.hidePoweredBy = false;
  }

  app.use(helmet(config));

  const appsensitive = express(); // Compliant (S5689) because if we find the express object as argument of other function we don't raise

  // this function is defined in another file
  correctlyConfigS5689(appsensitive);

  const appsensitive3 = createExpressApp();
  appsensitive3.use(hidePoweredBy()); // Compliant (S5689)

  let myClassApp = new ClassApp();
  const appsensitive4 = myClassApp.myApp;
  appsensitive4.use(hidePoweredBy()); // Compliant (S5689)
};
