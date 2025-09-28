import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "welth",
  name: "welth",
  // Enable logging for development
  isDev: process.env.NODE_ENV === "development",
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  }),
});
