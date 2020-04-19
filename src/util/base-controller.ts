const { Router } = require('express');
const { asyncHandler } = require('../middleware/util');

class BaseController {
  router: any;

  constructor() {
    /** @type Router */
    this.router = new Router();
  }

  /**
   * Async wraps and binds route handler functions
   * @param {RequestHandler & Function} handler
   * @returns {RequestHandler}
   */
  wrapRouteHandler(handler:any) {
    return asyncHandler(handler.bind(this));
  }
}

module.exports = BaseController;
