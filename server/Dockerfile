FROM node:16-alpine as builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY . .
RUN npm install typescript -g\
    && npm install\
    && npm install --only=dev\
    && npm run build


FROM node:20-alpine
# ENV NODE_ENV=production

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/build ./
COPY public ./public
COPY .env ./
CMD [ "node" , "server.js"]