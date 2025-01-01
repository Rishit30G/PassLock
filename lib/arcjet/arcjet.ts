import arcjet, { tokenBucket } from "@arcjet/next";

export const ajUpdate = arcjet({
  key: process.env.ARCJET_UPDATE_KEY!, 
  characteristics: ["userId"],
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 50, 
      interval: 86400, 
      capacity: 50,
    }),
  ],
});

export const ajDelete = arcjet({
  key: process.env.ARCJET_DELETE_KEY!, 
  characteristics: ["userId"],
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 50, 
      interval: 86400, 
      capacity: 50,
    }),
  ],
});

export const ajCreate = arcjet({
  key: process.env.ARCJET_CREATE_KEY!, 
  characteristics: ["userId"],
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 100, 
      interval: 86400, 
      capacity: 100,
    }),
  ],
});