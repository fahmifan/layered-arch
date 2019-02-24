const EventEmitter = require('events');

/**
 * @typedef {import('sequelize').Model} Model
 */
class SequelizeUserRepo extends EventEmitter {
  /**
   * @param { Object<string, Model> } param
   */
  constructor({ UserModel }) {
    super();
    this.UserModel = UserModel;
  }

  async getAll(...args) {
    const users = await this.UserModel.findAll(...args);
    return users;
  }

  create({ firstName, ...args }) {
    this.UserModel.findOrCreate({ where: { firstName, ...args } })
      .spread((user, created) => {
        if (!created) {
          this.emit('ERR_USEREXIST', new Error('user already exists'));
          return;
        }

        this.emit('SUCCESS', user);
      })
      .catch(e => this.emit('ERROR', e))
      .then(() => this.removeAllListeners());
  }
}

module.exports = SequelizeUserRepo;
