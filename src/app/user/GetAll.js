const EventEmitter = require('events');

module.exports = class GetAll extends EventEmitter {
  /**
   * Constructor
   * @param { Object<string, Object<string, function>> } param
   */
  constructor({ userRepo }) {
    super();
    this.userRepo = userRepo;
  }

  exec() {
    this.userRepo.getAll()
      .then(users => this.emit('SUCCESS', users))
      .catch(e => this.emit('ERROR', e));
  }
};
