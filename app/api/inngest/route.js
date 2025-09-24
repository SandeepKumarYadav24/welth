export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 300;
import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { helloWorld } from "@/lib/inngest/functions";
import { checkBudgetAlerts } from "@/lib/inngest/functions";

export const { GET, POST, PUT, OPTIONS } = serve({
  client: inngest,
  functions: [checkBudgetAlerts],
});
