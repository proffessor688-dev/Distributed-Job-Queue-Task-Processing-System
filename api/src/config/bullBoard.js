const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');

function setupBullBoard(app, jobQueue) {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  createBullBoard({
    queues: [new BullMQAdapter(jobQueue)],
    serverAdapter,
  });

  app.use('/admin/queues', serverAdapter.getRouter());
}

module.exports = setupBullBoard;