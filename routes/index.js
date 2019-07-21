// combine routes
const register = require('./register');
const data = require('./data');

module.exports= (server) => {
  register(server);
  data(server);
};