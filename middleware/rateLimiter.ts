import { rateLimit } from "express-rate-limit"

export const rateLimitMiddleware = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Change in production
  message: "You have exceeded your 100 requests per hour limit.",
  headers: true,
})
