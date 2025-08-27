import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  BookUser,
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
  UserPen,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";
import { dark } from "@clerk/themes";


const Header = async () => {
  await checkUser()
  
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo1.jpg"
            alt="text"
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href={"/profile"}>
              <Button>
                <UserPen className="h-4 w-4" />
                <span className="hidden md:block">Your Profile</span>
              </Button>
            </Link>
            <Link href={"/dashboard"}>
              <Button variant="outline">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block">Industry Insights</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={"/resume"} className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="hidden md:block">Build Resume</span>
                  </Link>
                </DropdownMenuItem>
        
                <DropdownMenuItem>
                  {" "}
                  <Link href={"/interview"} className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span className="hidden md:block">
                      Interview Preparation
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link href={"/mock-interview"} className="flex items-center gap-2">
                    <BookUser className="h-4 w-4" />
                    <span className="hidden md:block">
                      Mock Interview
                    </span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
            appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
             
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
