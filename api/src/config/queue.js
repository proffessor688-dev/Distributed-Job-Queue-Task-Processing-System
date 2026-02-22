const { Queue } = require("bullmq");
const redis = require("./redis");

const jobQueue = new Queue("jobQueue", {
  connection: redis,
});

module.exports = jobQueue;
