"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { 
  FileIcon, 
  StarIcon, 
  TrashIcon, 
  MessageSquare  
} from "lucide-react";

import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideNav() {
  const pathname = usePathname();

  return (
    <div className="w-15 flex flex-col gap-4 bg-muted/50 border-r rounded-m min-h-[100vh]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>          
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
          </TooltipTrigger>
          <TooltipContent side="right">Files</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent side="right">Favorites</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
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
            </TooltipTrigger>
          <TooltipContent side="right">Chat</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>  
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
          </TooltipTrigger>
          <TooltipContent side="right">Trash</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}