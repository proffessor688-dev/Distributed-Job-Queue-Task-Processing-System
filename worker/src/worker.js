const { Worker } = require("bullmq");
const pool = require("./config/db");
const redis = require("./config/redis");

const worker = new Worker(
  "jobQueue",
  async (job) => {
    const { jobId, type } = job.data;
    if (type === "fail") {
      throw new Error("Manual error for testing");
    }

    try {
      console.log("Processing job:", jobId);

      await pool.query("UPDATE jobs SET status = 'active' WHERE id = $1", [
        jobId,
      ]);

      await new Promise((resolve) => setTimeout(resolve, 5000));

      await pool.query("UPDATE jobs SET status = 'completed' WHERE id = $1", [
        jobId,
      ]);

      console.log("Job completed:", jobId);
    } catch (err) {
      await pool.query("UPDATE jobs SET status = 'failed' WHERE id = $1", [
        jobId,
      ]);

      throw err;
    }
  },
  {
    connection: redis,
    concurrency: 5,
  },
);

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed after ${job.attemptsMade} attempts`);
});

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});
