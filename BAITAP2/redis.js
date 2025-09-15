import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://127.0.0.1:6379", // chỉnh host/port nếu khác
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

await redisClient.connect();

export default redisClient;
