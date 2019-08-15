/* eslint-disable max-len */
const Register = require('../models/Register');
const errors = require('restify-errors');
const uniqueRandom = require('unique-random');

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
      return next(new errors.InvalidContentError('Expects \'application/json\''));
    }

    const {
      serverurl,
      servername,
      userid,
      token,
    } = req.body;

    const randomID = uniqueRandom(99999, 1000000);
    const _id = randomID();

    const serverinfo = {
      'serverurl': serverurl,
      'servername': servername,
    };

    const headers = {
      'X-Auth-Token': token,
      'X-User-Id': userid,
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
        } else {
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
      }
    }).catch(() => {
      res.send(500, {
        message: 'Internal Server Error',
        status: false,
      });

      next();
    });
  });
};
