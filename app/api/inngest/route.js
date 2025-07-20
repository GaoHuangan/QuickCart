import { serve } from "inngest/next";
import { inngest, syncUserUpdation, syncUserDeletion, syncUserCreation } from "../../../config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserUpdation,
    syncUserDeletion,
    syncUserCreation,
  ],
}); 