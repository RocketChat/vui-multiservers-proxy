const Register = require('../models/Register');
const errors = require('restify-errors');

module.exports = (server) => {
  server.get('/ping', (req, res, next) => {
    res.send(200, {
      message: 'pong',
      status: true,
    });
    next();
  });

  server.post('/register', async (req, res, next) => {
    // Check For JSON

    if (!req.is('application/json')) {
      // eslint-disable-next-line max-len
      return next(new errors.InvalidContentError('Expects \'application/json\''));
    }

    const {
      serverurl,
      servername,
      userid,
      token,
    } = req.body;

    const _id = Math.floor(100000 + Math.random() * 900000);

    const serverinfo = {
      'serverurl': serverurl,
      'servername': servername,
    };

    const headers = {
      'X-Auth-Token': userid,
      'X-User-Id': token,
    };

    const register = new Register({
      _id,
      serverinfo,
      headers,
    });

    Register.findOne({
      _id: _id,
    }).then((user) => {
      if (user) {
        res.send(500, {
          message: 'Internal Server Error',
          status: false,
        });

        next();
      } else {
        if (!serverurl || !servername || !userid || !token) {
          res.send(400, {
            message: 'User validation failed',
            status: false,
          });

          next();
        }

        register.save()
            .then()
            .catch();

        res.send({
          code: _id,
          expiry: 5,
          status: true,
        });

        next();
      }
    });
  });
};
