"use client";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { UploadFileSchema } from "@/schemas";
import { uploadFile } from "@/actions/upload-file";

export function UploadButton() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UploadFileSchema>>({
    resolver: zodResolver(UploadFileSchema),
    defaultValues: {
      title: "",
      files: undefined,
    },
  });

  const fileRef = form.register("files");

  async function onSubmit(values: z.infer<typeof UploadFileSchema>) {
    
    const formData = new FormData();
    formData.append("title", values.title);

    Array.from(values.files).forEach((file) => {
      formData.append("files", file);
    });


    await uploadFile(formData);
    
    // const result = await fetch(postUrl, {
    //   method: "POST",
    //   headers: { "Content-Type": fileType },
    //   body: values.file[0],
    // });
    // const { storageId } = await result.json();

    // const types = {
    //   "image/png": "image",
    //   "application/pdf": "pdf",
    //   "text/csv": "csv",
    // } as Record<string, Doc<"files">["type"]>;

    try {
      // await createFile({
      //   name: values.title,
      //   fileId: storageId,
      //   orgId,
      //   type: types[fileType],
      // });

      form.reset();

      setIsFileDialogOpen(false);

      toast({
        // variant: "success",
        title: "File Uploaded",
        description: "Now everyone can view your file",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Your file could not be uploaded, try again later",
      });
    }
  }

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  return (
    <Dialog
      open={isFileDialogOpen}
      onOpenChange={(isOpen) => {
        setIsFileDialogOpen(isOpen);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>Upload File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">Upload your File Here</DialogTitle>
          <DialogDescription>
            This file will only be accessible to you.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="files"
                render={() => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input multiple={true} type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex gap-1"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}