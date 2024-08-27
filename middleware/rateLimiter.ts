import { rateLimit } from 'express-rate-limit'

const rateLimitMiddleware = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, 
    message: "You have exceeded your 5 requests per hour limit.",
    headers: true,
  });
  
  module.exports = rateLimitMiddleware;         