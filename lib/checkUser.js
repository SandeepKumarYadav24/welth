import { getCurrentDbUser } from "@/lib/db-user";

export const checkUser = async () => {
  return getCurrentDbUser();
};
