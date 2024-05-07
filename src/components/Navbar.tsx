import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth"
import { LogoutButton } from "@/components/auth/logout-button";
import { LoginButton } from "@/components/auth/login-button";
import NavMenu from "@/components/nav-menu";

export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="border-b bg-background h-[10vh] flex items-center">
            <div className="container flex items-end">
                <Link href="/">
                    <h1 className="font-bold text-3xl">Notes And Files</h1>
                </Link>
                { session &&
                    <div className="px-8 font-bold"> 
                        <NavMenu></NavMenu>
                    </div>
                }
            </div>
            <div className="container flex items-center gap-x-5 justify-end">
                <ThemeToggle/>
                <div className="flex items-center gap-x-5">
                    {
                        session 
                        ? 
                            <LogoutButton>
                                <Button variant="secondary">
                                    Sign Out
                                </Button>
                            </LogoutButton>
                        :
                            <LoginButton>
                                <Button>
                                    Sign In/Up
                                </Button>
                            </LoginButton>
                    }
                </div>
            </div>
        </nav>
    )
}
