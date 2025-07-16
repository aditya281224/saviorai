import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "saviorai", 
  name: "saviorai",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});