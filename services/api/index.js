'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const ns = require('../../namespace');

const restify = require('restify');
const config = require('config');
const fs = require('fs');

const RouteOptions = require('./options');

// todo: replace it on prod
const errors = require('../../common/errors');

const { MissingComponentsError } = errors.api.server;

const server = restify.createServer();

server.get('/api', (req, res) => res.send('api is running...', 200));

const componentsPath = `${ns.api_path()}/components`;

const components = fs.readdirSync(componentsPath);

if (components.length) {
  for (const i in components) {
    const componentStat = fs.statSync(`${componentsPath}/${components[i]}`);

    if (componentStat && componentStat.isDirectory()) {
      const routes = require(`${componentsPath}/${components[i]}/routes`);
      const options = new RouteOptions({
        component: components[i],
        path: `/api/${components[i]}`,
        version: config.get('api.version')
      });

      server.get(
        {
          name: options.createRouteName('ping'),
          path: options.generateUrl('ping'),
          version: options.version
        },
        (req, res) => res.send(200, true)
      );

      routes(server, options);
    }
  }
} else {
  throw new MissingComponentsError();
}

server.listen(config.get('api.port') || 8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});
