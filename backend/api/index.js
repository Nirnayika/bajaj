const app = require('../server');

module.exports = (req, res) => {
  // Handle requests with the Express app
  app(req, res);
};
