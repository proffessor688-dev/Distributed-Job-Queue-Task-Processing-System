Distributed Job Processing System

A scalable distributed background job processing system built using Node.js, PostgreSQL, Redis, BullMQ, Docker, and Bull Board.

This project demonstrates real-world backend architecture including job queuing, retry strategies, worker scaling, monitoring dashboards, and containerized microservices.

📌 Project Overview

This system allows users to:

Submit background jobs via API

Store job metadata in PostgreSQL

Queue jobs using Redis

Process jobs asynchronously using BullMQ workers

Retry failed jobs with exponential backoff

Delay job execution when required

Monitor jobs through a web dashboard

Scale workers horizontally using Docker containers

The architecture simulates production-level backend systems used in large-scale applications.

🏗️ Tech Stack

Backend: Node.js, Express.js
Queue System: BullMQ
Queue Broker: Redis
Database: PostgreSQL
Monitoring: Bull Board
Containerization: Docker & Docker Compose
Version Control: Git & GitHub

📂 System Architecture

Client → API Server → Redis Queue → Worker → PostgreSQL

Flow Explanation:

Client sends job request to API server

API server:

Stores job metadata in PostgreSQL

Pushes job to Redis queue

Worker container:

Listens to Redis queue

Processes job asynchronously

Updates job status in PostgreSQL

Bull Board dashboard:

Displays waiting, active, completed, failed jobs

Workers can be scaled horizontally to increase processing capacity.

🐳 Docker Services
Service	Purpose
API	Handles incoming job requests
Worker	Processes background jobs
Postgres	Stores job data
Redis	Manages job queue
Bull Board	Job monitoring dashboard
 Key Features

 Asynchronous background job processing
 Delayed job execution
 Retry mechanism with exponential backoff
 Failed job tracking
 Job auto-cleanup configuration
 Worker horizontal scaling
 Dockerized multi-service architecture
 Monitoring dashboard using Bull Board
 Clean modular backend structure

 Example API Endpoint
Create a Job
POST /jobs
Example Response
{
  "id": 1,
  "status": "pending"
}
 Job Processing Features
Retry Configuration

Maximum 3 attempts

Exponential backoff strategy

Automatic failure handling

Delayed Jobs

Jobs can be scheduled to run after a specified delay

Useful for reminders, scheduled processing, etc.

Monitoring Dashboard

Accessible at:

/admin/queues

Displays:

Waiting jobs

Active jobs

Completed jobs

Failed jobs

Retry options

Job metadata & error logs

⚙️ Installation & Setup
-->Clone Repository
git clone <your-repo-url>
cd distributed-job-system
-->Start Services Using Docker
docker compose up --build

This starts:

API server

Worker service

PostgreSQL

Redis

Bull Board dashboard

Future Improvements

Authentication & authorization

Role-based admin access

Job priority support

Rate limiting

Dead-letter queue implementation

Metrics & logging integration

Cloud deployment (AWS / GCP)

CI/CD pipeline integration

