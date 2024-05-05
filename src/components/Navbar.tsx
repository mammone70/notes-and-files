import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="border-b bg-background h-[10vh] flex items-center">
        <div className="container flex items-center justify-between">
            <Link href="/">
                <h1 className="font-bold text-3xl">Notes And Files</h1>
            </Link>
        </div>
        <div className="container flex items-center gap-x-5 justify-end">
            <ThemeToggle/>
            <div className="flex items-center gap-x-5">
                <Button>Sign In</Button>
                <Button variant="secondary">Sign Up</Button>
            </div>
        </div>
    </nav>
  )
}
