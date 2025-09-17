import { SignedIn, SignedOut, SignInButton, UserButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  
  return (
    <header>
      <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="welth logo"
              height={60}
              width={200} // for resolution
              className="h-12 w-auto object-contain" // for Image
            />
          </Link>
          
          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link href={"/dashboard"} className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
                <Button variant="outline">
                  <LayoutDashboard size={18} />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>
              <Link href={"/transaction/create"}>
                <Button className="flex items-center gap-2">
                  <PenBox size={18} />
                  <span className="hidden md:inline">Add Transaction</span>
                </Button>
              </Link>
            </SignedIn>

            <SignedOut>
              <div className="flex items-center gap-3">
                <SignInButton forceRedirectUrl="/dashboard">
                  <Button variant="outline" className="border border-[#6c47ff] text-[#6c47ff] rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton forceRedirectUrl="/dashboard">
                  <Button variant="outline" className="border border-[#6c47ff] bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton appearance={{
                elements:{
                  avatarBox: "w-10 h-10",
                },
              }} />
            </SignedIn>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
