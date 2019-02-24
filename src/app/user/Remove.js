const EventEmitter = require('events');

module.exports = class Remove extends EventEmitter {
  /**
   * Constructor
   * @param { { userRepo } } param
   */
  constructor({ userRepo }) {
    super();
    this.userRepo = userRepo;
  }

  exec(name) {
    const rmIdx = this.userRepo.remove(name);

    if (rmIdx < 0) {
      this.emit('ENOTFOUND');
      return;
    }

    this.emit('SUCCESS', rmIdx);
  }
};
