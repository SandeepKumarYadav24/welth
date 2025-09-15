import { SignedIn, SignedOut, SignInButton, UserButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
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

          <SignedOut>
            <div className="flex items-center gap-3">
              <SignInButton>
                <button className="border border-[#6c47ff] text-[#6c47ff] rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="border border-[#6c47ff] bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
};

export default Header;
