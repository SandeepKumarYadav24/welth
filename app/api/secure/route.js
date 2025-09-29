import arcjet, { detectBot, shield } from "@arcjet/next";
import { NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"],
    }),
  ],
});

export async function GET(req) {
  const res = await aj.protect(req);

  if (!res.ok) {
    return NextResponse.json({ error: "Blocked by Arcjet" }, { status: 403 });
  }

  return NextResponse.json({ message: "Hello from secure API" });
}
