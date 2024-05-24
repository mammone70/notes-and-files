"use client";

import { chatWithFiles } from "@/actions/chat-with-files";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChatSchema } from "@/schemas";
import { CornerDownLeft, Mic } from "lucide-react"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

export default function ChatInterface() {
    const[conversation, setConversation] = useState("");
    
    const form = useForm<z.infer<typeof ChatSchema>>({
        resolver: zodResolver(ChatSchema),
        defaultValues: {
            message: "",
            conversation: ""
        },
    });

    async function onSubmit(values: z.infer<typeof ChatSchema>) {
        const { response, error } = await chatWithFiles(
            {
                ...values,
                conversation,
            }
        );
        // const { response, error } = await chatWithFiles(values);
        
        // TODO if error, show error

        setConversation(response || "");
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="pb-2 text-3xl font-extrabold -tracking-tight lg:text-3xl">
                Chat With Your Notes And Files
            </h2>
            <div className="relative flex w-10/12 min-h-[80vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                <Badge variant="outline" className="absolute right-3 top-3">
                    Output
                </Badge>
                <div className="flex-1 h-full">
                    {conversation}
                </div>
                <form
                    className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <Label htmlFor="message" className="sr-only">
                        Message
                    </Label>
                    <Textarea
                        id="message"
                        {...form.register("message")}
                        placeholder="Type your message here..."
                        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                    />
                    <div className="flex items-center p-3 pt-0">
                        <TooltipProvider>
                            {/* <Tooltip>
                                <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Paperclip className="size-4" />
                                    <span className="sr-only">Attach file</span>
                                </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">Attach File</TooltipContent>
                            </Tooltip> */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Mic className="size-4" />
                                        <span className="sr-only">Use Microphone</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">Use Microphone</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <Button type="submit" size="sm" className="ml-auto gap-1.5">
                            Send Message
                            <CornerDownLeft className="size-3.5" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
  )
}
