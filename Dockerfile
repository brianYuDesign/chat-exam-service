FROM node:14.16.1-alpine AS builder
WORKDIR /app
COPY . /app
RUN npm install && npm run build && npm prune --production


FROM node:14.16.1-alpine
WORKDIR /app

COPY --from=builder /app/ /app/
CMD [ "npm" , "run", "start"]