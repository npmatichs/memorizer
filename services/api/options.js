'use strict';

const ns = require('../../namespace');

const url = require(ns.common_path('modules/url'));

module.exports = class Options {
  /**
   * Options constructor
   */
  constructor(options) {
    this.path = options.path;
    this.component = options.component;
    this.version = options.version;
  }

  /**
   * Create route name.
   * @param {string} name
   * @return {string}
   */
  createRouteName(name) {
    return `api_${this.getComponent()}_${name}`;
  }

  /**
   * Generate url.
   * @param {string} restifyUrl Restify url string
   * @return {string}
   */
  generateUrl(restifyUrl) {
    return url.join(this.getPath(), restifyUrl || '');
  }

  getPath() {
    return this.path;
  }

  getComponent() {
    return this.component;
  }

  getVersion() {
    return this.version;
  }
};
