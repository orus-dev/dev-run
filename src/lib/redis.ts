import "server-only";
import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL!);

export const redisSubscriber = new Redis(process.env.REDIS_URL!);

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

redisSubscriber.on("error", (err) => {
  console.error("Redis subscriber error:", err);
});
