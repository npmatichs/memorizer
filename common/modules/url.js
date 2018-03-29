const urljoin = require('url-join');

module.exports = {
  join: (master, ...urls) => urljoin(master, ...urls)
};
