const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const routes = require("./routes");

const server = restify.createServer();

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB, {
        useCreateIndex: true,
        useNewUrlParser: true
    });
});

const db = mongoose.connection;

db.on('error', err =>
    console.log(err)
);

db.once('open', () => {
    routes(server);
    console.log(`Server Started on ${config.PORT}`);
});

module.exports = server;
