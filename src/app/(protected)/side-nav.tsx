"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { 
  FileIcon, 
  StarIcon, 
  TrashIcon, 
  MessageSquare  
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideNav() {
  const pathname = usePathname();

  return (
    <div className="w-15 flex flex-col gap-4 bg-muted/50 border-r rounded-m min-h-[100vh]">
      <Link href="/files">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "bg-secondary": pathname.includes("/files"),
          })}
        >
          <FileIcon />
        </Button>
      </Link>
          
      <Link href="/favorites">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "bg-secondary" : pathname.includes("/favorites"),
          })}
        >
          <StarIcon />
        </Button>
      </Link>

      <Link href="/chat">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            // "text-blue-500": pathname.includes("/chat"),
            "bg-secondary": pathname.includes("/chat"),
          })}
        >
          <MessageSquare />
        </Button>
      </Link>

      <Link href="/trash">
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "bg-secondary" : pathname.includes("/trash"),
          })}
        >
          <TrashIcon />
        </Button>
      </Link>
    </div>
  );
}