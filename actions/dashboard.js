"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";

// Helper function to ensure user exists in database
async function ensureUserExists(userId) {
  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  // If user doesn't exist in database, create them using Clerk data
  if (!user) {
    try {
      const { currentUser } = await import("@clerk/nextjs/server");
      const clerkUser = await currentUser();
      
      if (!clerkUser) {
        throw new Error("Clerk user not found");
      }

      const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim();
      
      user = await db.user.create({
        data: {
          clerkUserId: clerkUser.id,
          name: name || "Unknown User",
          imageUrl: clerkUser.imageUrl,
          email: clerkUser.emailAddresses[0]?.emailAddress,
        },
      });
    } catch (createError) {
      console.error("Error creating user:", createError);
      throw new Error("Failed to create user in database");
    }
  }

  return user;
}

const serializeTransaction = (obj) => {
  const serialized = { ...obj };              //serializeTransaction → make DB/objects JSON-safe
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();           //get safe numeric/string value
  }

  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();           //get safe numeric/string value
  }
  return serialized;
};

export async function CreateAccount(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Get request data for ArcJet
    const req = await request();

    // Check rate limit
    const decision = await aj.protect(req, {
      userId,
      requested: 1, // Specify how many tokens to consume
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.error({
          code: "RATE_LIMIT_EXCEEDED",
          details: {
            remaining,
            resetInSeconds: reset,
          },
        });

        throw new Error("Too many requests. Please try again later.");
      }

      throw new Error("Request blocked");
    }

    const user = await ensureUserExists(userId);

    // Convert balance to float before saving
    const balanceFloat = parseFloat(data.balance);  //Converts a string → floating point number(parseFloat("10.20") + 50 =60.20)
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }

     // Check if this is the user's first account
    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    // If it's the first account, make it default regardless of user input
    // If not, use the user's preference
    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;

    // If this account should be default, unset other default accounts
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    // Create new account
    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault, // Override the isDefault based on our logic
      },
    });

    // Serialize the account before returning
    const serializedAccount = serializeTransaction(account);

    revalidatePath("/dashboard");                 //re-fetch Next.js static pages after DB updates.
    return { success: true, data: serializedAccount };
  } catch (error) {
    throw new Error(error.message);
  }   
}                             

export async function getUserAccounts() {
  const { userId } = await auth();                   //fetch account from db
  if (!userId) throw new Error("Unauthorized");

  const user = await ensureUserExists(userId);

 try {
    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    const serializedAccounts = accounts.map(serializeTransaction);

    return serializedAccounts;
  } catch (error) {
    console.error(error.message);
  }
};

export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await ensureUserExists(userId);

  // Get all user transactions
  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializeTransaction);
}