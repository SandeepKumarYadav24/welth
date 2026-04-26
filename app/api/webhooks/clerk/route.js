import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "@/lib/prisma.js";

export async function POST(req) {
  const payload = await req.text();
  const headerPayload = await headers();

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(payload, {
      "svix-id": headerPayload.get("svix-id"),
      "svix-timestamp": headerPayload.get("svix-timestamp"),
      "svix-signature": headerPayload.get("svix-signature"),
    });
  } catch (err) {
    console.error("Webhook verification failed", err.message);
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses[0]?.email_address;

    if (!email) {
      return new Response("Missing primary email", { status: 400 });
    }

    await db.user.upsert({
      where: { clerkUserId: id },
      update: {
        email,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
      },
      create: {
        clerkUserId: id,
        email,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
      },
    });
  }

  return new Response("Webhook received", { status: 200 });
}
