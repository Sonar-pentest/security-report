const express = require('express');
const hidePoweredBy = require('hide-powered-by');

module.exports.correctlyConfigS5689 = function (app) {
  app.use(hidePoweredBy()); // Compliant
};

module.exports.createExpressApp = function () {
  var appsensitive = express(); // Compliant (S5689) because express object is returned from the function

  return appsensitive;
};

module.exports.ClassApp = class {
  constructor() {
    this.myApp = express(); // Compliant (S5689) because express object is assigned to a property
  }
};
