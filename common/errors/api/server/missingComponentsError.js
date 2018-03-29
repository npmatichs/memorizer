'use strict';

module.exports = class MissingComponentsError extends Error {
  /**
   * MissingComponentsError constructor
   */
  constructor(msg, status = 500) {
    super('Missing api components!!!' || msg);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);

    this.status = status || 500;
  }

  /**
   * Suggestions to resolve & reporoduce the error.
   * @return {array}
   */
  suggestions() {
    return [
      'Check if components exists in api',
      'Check the load path of components if correct',
      'Check api initialize stack'
    ]
  }
};
