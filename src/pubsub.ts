import Redis from "ioredis";

export const publisher = new Redis({
  port: Number(process.env.REDIS_PORT || 6379),
  host: process.env.REDIS_HOST,
});

export const subscriber = new Redis({
  port: Number(process.env.REDIS_PORT || 6379),
  host: process.env.REDIS_HOST,
});
