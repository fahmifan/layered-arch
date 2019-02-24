const EventEmitter = require('events');

module.exports = class Create extends EventEmitter {
  /**
   * Constructor
   * @param { { userRepo } } param
   */
  constructor({ userRepo }) {
    super();
    this.userRepo = userRepo;
  }

  exec({ firstName, lastName, email }) {
    this.userRepo
      .on('SUCCESS', user => this.emit('SUCCESS', user))
      .on('ERR_USEREXIST', () => this.emit('ERR_USEREXIST'))
      .on('ERROR', e => this.emit('ERROR', e))
      .create({ firstName, lastName, email });
  }
};
