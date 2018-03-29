'use strict';

/** server side errors */
const MissingComponentsError = require('./server/missingComponentsError');

/** client side errors */
//

module.exports = {
  client: {},
  server: {
    MissingComponentsError: MissingComponentsError
  }
}