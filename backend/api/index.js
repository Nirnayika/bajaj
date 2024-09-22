const app = require('../server');

module.exports = (req, res) => {
  // Handle requests with the Express app
  app(req, res);
};
app.get('/api/test', (req, res) => {
    res.send('API is working');
  });
  