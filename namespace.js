'use strict';

const path = require('path');

const packagejson = require('./package');

const paths = packagejson.namespaces;

const workspaceFolder = __dirname;

const lookupKeywords = {
  workspaceFolder: workspaceFolder
};

const loadedNamespaces = {};

const namespaces = Object.keys(paths);

if (namespaces && namespaces.length) {
  namespaces.forEach((namespace) => {
    const keywords = Object.keys(lookupKeywords);
    let _path = paths[namespace];

    keywords.forEach((keyword) => {
      const re = new RegExp(`\\\$\\\{${keyword}\\\}`, 'g');

      _path = _path.replace(re, lookupKeywords[keyword]);
    });

    loadedNamespaces[namespace] = concrete => concrete ? path.join(_path, concrete) : _path;
  })
}

module.exports = loadedNamespaces;
