require('dotenv').config();
module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  MONGODB: process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@rocket-chat-multiserver-proxy-ellmo.mongodb.net/test?retryWrites=true&w=majority`,
};