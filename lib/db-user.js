import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

function buildDisplayName(user) {
  const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  return name || user.username || "Welth User";
}

function getPrimaryEmail(user) {
  return user.emailAddresses?.[0]?.emailAddress || null;
}

export async function getCurrentDbUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Authenticated Clerk user could not be loaded");
  }

  const email = getPrimaryEmail(clerkUser);

  if (!email) {
    throw new Error("Authenticated Clerk user does not have a primary email address");
  }

  return db.user.upsert({
    where: {
      clerkUserId: clerkUser.id,
    },
    update: {
      email,
      name: buildDisplayName(clerkUser),
      imageUrl: clerkUser.imageUrl,
    },
    create: {
      clerkUserId: clerkUser.id,
      email,
      name: buildDisplayName(clerkUser),
      imageUrl: clerkUser.imageUrl,
    },
  });
}
