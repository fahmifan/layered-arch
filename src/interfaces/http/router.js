const { Router } = require('express');
const bodyParser = require('body-parser');
const UserController = require('./UserController');
const SequelizeUserRepo = require('../../infra/user/SequelizeUserRepo');
const userOps = require('../../app/user');
const db = require('../../infra/database/models');

const apiRoute = Router();
apiRoute.use(bodyParser.json());
apiRoute.use(bodyParser.urlencoded({ extended: false }));

// custom routes
apiRoute.use('/api', new UserController({ userRepo: new SequelizeUserRepo({ UserModel: db.User }), userOps }).router());

// 404 Not Found routes
apiRoute.get('*', (req, res) => res.status(404).json({ error: 'routes not found' }));

module.exports = apiRoute;
