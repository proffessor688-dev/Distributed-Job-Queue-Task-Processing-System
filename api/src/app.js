const express = require("express");
const pool = require("./config/db");
const jobQueue = require("./config/queue");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.post("/jobs", async (req, res) => {
  try {
    const { type, payload } = req.body;

    if (!type) {
      return res.status(400).json({ error: "Job type required" });
    }

    const result = await pool.query(
      "INSERT INTO jobs (type, payload) VALUES ($1, $2) RETURNING *",
      [type, payload],
    );

    const job = result.rows[0];

    await jobQueue.add("processJob", {
      jobId: job.id,
      type,
      payload,
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create job" });
  }
});

app.listen(3000, () => {
  console.log("API running on port 3000");
});
