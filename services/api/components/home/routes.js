'use strict';

module.exports = (router, o) => {
  router.get({
    name: o.createRouteName('index'),
    path: o.generateUrl(),
    version: o.version,
  }, (req, res) => {
    res.send('home endpoint executed with success', 200);
  });
};
