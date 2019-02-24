const Server = require('./src/interfaces/http/Server');
const router = require('./src/interfaces/http/router');
const config = require('./config');

new Server({ router, config, logger: console })
  .start()
  .catch((error) => {
    console.error(error.stack);
    process.exit();
  });
