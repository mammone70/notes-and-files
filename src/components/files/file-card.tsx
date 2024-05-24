import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelative } from "date-fns";

import { FileTextIcon } from "lucide-react";
import { ReactNode } from "react";
import Image from "next/image";
import { FileCardActions } from "./file-actions";
import { auth } from "@/auth";
import { File, FileType } from "@prisma/client";
import PDFIcon from "@/components/icons/pdf-icon";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"

const typeIcons = {
  TEXT: <FileTextIcon />,
  PDF: <PDFIcon />,
} as Record<FileType, ReactNode>;

export async function FileCard({
  file,
}: {
  // file: File<"files"> & { isFavorited: boolean; url: string | null };
  file: File;
}) {
  const session = await auth();
  
  // const userProfile = useQuery(api.users.getUserProfile, {
  //   userId: file.userId,
  // });

  return (
    <TooltipProvider>
      <Card>
        <CardHeader className="relative">
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="flex gap-2 py-4 text-base font-normal truncate">
                <div className="flex justify-center">{typeIcons[file.fileType]}</div>{" "}
                {file.name}
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent side="top">{file.name}</TooltipContent>
          </Tooltip>
          <div className="absolute top-2 right-2">
            <FileCardActions isFavorited={true} file={file} />
            {/* File Card Actions */}
          </div>
        </CardHeader>
        <CardContent className="h-[100px] flex justify-center items-center">
          {/* {file.type === "image" && file.url && (
            <Image alt={file.name} width="200" height="100" src={file.url} />
          )}
          {file.type === "csv" && <GanttChartIcon className="w-20 h-20" />}
          {file.type === "pdf" && <FileTextIcon className="w-20 h-20" />}
          */}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
            {/* <Avatar className="w-6 h-6">
              <AvatarImage src={session.user?.image ? session.data?.user?.image : undefined} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
            {session?.user?.name}
          </div>
          <div className="text-xs text-gray-700">
            {/* Uploaded on {formatRelative(new Date(file._creationTime), new Date())} */}
            Uploaded on TODO
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}