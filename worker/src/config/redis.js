const IORedis = require("ioredis");

const redis = new IORedis({
  host: "redis",
  port: 6379,
  maxRetriesPerRequest: null, 
});

module.exports = redis;