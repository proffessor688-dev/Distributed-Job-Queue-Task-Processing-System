const { Queue } = require("bullmq");

const jobQueue = new Queue("jobQueue", {
  connection: {
    host: process.env.REDIS_HOST,
    port: 6379,
  },
});

module.exports = jobQueue;
