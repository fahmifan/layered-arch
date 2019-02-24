const express = require('express');

module.exports = class Server {
  constructor({ config, router, logger }) {
    this.config = config;
    this.logger = logger;
    this.express = express();

    this.express.disable('x-powered-by');
    this.express.get('/ping', (req, res) => res.json({ message: 'pong' }));
    this.express.use(router);
  }

  start() {
    return new Promise((resolve) => {
      const http = this.express
        .listen(this.config.web.port, () => {
          const { port } = http.address();
          this.logger.info(`[p ${process.pid}] Listening at port :${port}`);
          resolve();
        });
    });
  }
};
