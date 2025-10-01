import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "@/lib/prisma.js";

export async function POST(req) {
  const payload = await req.json();
  const headerPayload = headers();

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(JSON.stringify(payload), headerPayload);
  } catch (err) {
    console.error("Webhook verification failed", err.message);
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    await db.user.upsert({
      where: { clerkUserId: id },
      update: {
        email: email_addresses[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
      },
      create: {
        clerkUserId: id,
        email: email_addresses[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
      },
    });
  }

  return new Response("Webhook received", { status: 200 });
}
