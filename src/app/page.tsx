import { LoginButton } from "@/components/auth/login-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex items-center justify-center bg-background h-[90vh]">
      <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <span className="w-auto px-6 py-3 rounded-full bg-secondary">
              <span className="text-sm font-medium text-primary">
                Manage all of your Dispositions
              </span>
            </span>

            <h1 className="mt-8 text-3xl font-extrabold -tracking-tight lg:text-6xl">Easily Market Your Deals</h1>
            <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl font-bold text-muted-foreground">
              Here are several lines of copy explaining what this product
              does and how it can benefit you.
            </p>
          </div> 
          <div className="flex justify-center max-w-sm mx-auto mt-10">
            <LoginButton>
              <Button size="lg" className="w-full">
                Sign Up Now
              </Button>
            </LoginButton>
          </div>
        </div>
      </div>
    </section>
  );
}
  