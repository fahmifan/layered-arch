const { Router } = require('express');

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

module.exports = class UserController {
  constructor({ userRepo, userOps }) {
    this.userRepo = userRepo;
    this.r = Router();
    this.user = userOps;
    this.getAll = this.getAll.bind(this);
    this.delete = this.delete.bind(this);
    this.create = this.create.bind(this);
  }

  router() {
    /**
     * @api {get} /users get all users
     * @apiName getAll
     * @apiGroup users
     */
    this.r.get('/users', this.getAll);

    /**
     * @api {post} /users create new user
     * @apiName createUser
     * @apiGroup users
     *
     * @apiParam {string} name new user name
     */
    this.r.post('/users', this.create);

    /**
     * @api {delete} /users/:name dele a user
     * @apiName deleteUser
     * @apiGroup users
     *
     * @apiParam {string} name new user name
     */
    this.r.delete('/users/:name', this.delete);

    return this.r;
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  getAll(req, res) {
    new this.user.GetAll({ userRepo: this.userRepo })
      .on('SUCCESS', (users) => {
        res.status(200).json({ users });
      })
      .on('ERROR', (e) => {
        res.status(400).json({ error: e.message });
      })
      .exec();
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  delete(req, res) {
    new this.user.Remove({ userRepo: this.userRepo })
      .on('SUCCESS', (rmIdx) => {
        res.status(200).json({ remove_idx: rmIdx });
      })
      .on('ENOTFOUND', () => {
        res.status(404).json({ error: 'user not found' });
      })
      .exec(req.params.name);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  create(req, res) {
    const { firstName, lastName, email } = req.body;
    new this.user.Create({ userRepo: this.userRepo })
      .on('SUCCESS', () => res.status(200).json({ status: 'ok' }))
      .on('ERR_USEREXIST', () => res.status(409).json({ error: 'user already exists' }))
      .on('ERROR', e => res.status(500).json({ error: e.message }))
      .exec({ firstName, lastName, email });
  }
};
