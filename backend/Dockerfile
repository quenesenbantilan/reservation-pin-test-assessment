FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json jest.config.cjs ./
COPY src ./src

ENV NODE_ENV=development

CMD ["sh", "-c", "npm run migrate && npm run dev"]

