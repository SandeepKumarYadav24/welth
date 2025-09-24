export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 300;
import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { helloWorld } from "@/lib/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld, // all your functions get added here
  ],
});
