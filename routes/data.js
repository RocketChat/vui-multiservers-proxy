const Register = require('../models/Register');

module.exports = (server) => {
  server.get('/user/data', async (req, res, next) => {
    try {
      const qcode = req.query.qcode;

      const data = await Register.findOne({_id: qcode});

      if (data) {
        res.send(200, {
          data: data,
          status: true,
        });

        next();
      } else {
        res.send(404, {
          message: 'No Record Found',
          status: false,
        });

        next();
      }
    } catch {
      res.send(500, {
        message: 'Internal Server Error',
        status: false,
      });

      next();
    }
  });
};
