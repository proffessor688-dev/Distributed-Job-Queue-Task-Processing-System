console.log("Worker started...");
setInterval(() => {}, 1000);
const { Worker } = require("bullmq");
const pool = require("./config/db");
const redis=require('./config/redis');

const worker = new Worker(
  "jobQueue",
  async (job) => {
    const { jobId, type, payload } = job.data;

    console.log("Processing job:", jobId);

    await pool.query("UPDATE jobs SET status = 'active' WHERE id = $1", [
      jobId,
    ]);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    await pool.query("UPDATE jobs SET status = 'completed' WHERE id = $1", [
      jobId,
    ]);

    console.log("Job completed:", jobId);
  },
  {
    connection: redis
  },
);


