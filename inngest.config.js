import { defineConfig } from "inngest/next";

export default defineConfig({
  name: "QuickCart",
  signingKey: process.env.INNGEST_SIGNING_KEY,
  eventKey: process.env.INNGEST_EVENT_KEY,
}); 