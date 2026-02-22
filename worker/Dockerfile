FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install || true

COPY . .

CMD ["node", "src/worker.js"]
