import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient(); //if Prisma client exists (globalThis.prisma) then reuse it,Ifnot → create new(new PrismaClient()). 

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// Next.js (especially in dev mode with hot reloading feature) reloads your code on every save.
// Every reload create new PrismaClient instance → leads to too many open database connections.
// That’s why you need a singleton pattern: only create one PrismaClient during development.
// On the next reload, instead of creating a new connection, it reuses this one.
