import { UploadButton } from "@/components/files/upload-button";
import { FileCard } from "@/components/files/file-card";
import Image from "next/image";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import { SearchBar } from "./search-bar";
import { useState } from "react";
import { DataTable } from "@/components/files/file-table";

// import { columns } from "./columns";

import { 
  Tabs, 
  TabsContent,
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { File } from "@prisma/client";
import { auth } from "@/auth";
import { getAllFiles } from "@/data/file";

function Placeholder() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <Image
        alt="an image of a picture and directory icon"
        width="300"
        height="300"
        src="/empty.svg"
      />
      <div className="text-2xl">You have no files, upload one now</div>
      <UploadButton />
    </div>
  );
}

export async function FileBrowser({
  title,
  favoritesOnly,
  deletedOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
}) {
  const session = await auth();
  
  const files = await getAllFiles();

  // let orgId: string | undefined = undefined;
  // if (organization.isLoaded && user.isLoaded) {
  //   orgId = organization.organization?.id ?? user.user?.id;
  // }

  // const favorites = useQuery(
  //   api.files.getAllFavorites,
  //   orgId ? { orgId } : "skip"
  // );

  // const files = useQuery(
  //   api.files.getFiles,
  //   orgId
  //     ? {
  //         orgId,
  //         type: type === "all" ? undefined : type,
  //         query,
  //         favorites: favoritesOnly,
  //         deletedOnly,
  //       }
  //     : "skip"
  // );
  // const isLoading = files === undefined;
  const isLoading = false;

  // const modifiedFiles =
  //   files?.map((file) => ({
  //     ...file,
  //     isFavorited: (favorites ?? []).some(
  //       (favorite) => favorite.fileId === file._id
  //     ),
  //   })) ?? [];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>

        {/* <SearchBar query={query} setQuery={setQuery} /> */}
        <SearchBar/>
        <UploadButton />
      </div>

      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center">
          <TabsList className="mb-2">
            <TabsTrigger value="grid" className="flex gap-2 items-center">
              <GridIcon />
              Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="flex gap-2 items-center">
              <RowsIcon /> Table
            </TabsTrigger>
          </TabsList>

          {/* <div className="flex gap-2 items-center">
            <Label htmlFor="type-select">Type Filter</Label>
            <Select
              // value={type}
              onValueChange={(newType) => {
                // setType(newType as any);
              }}
            >
              <SelectTrigger id="type-select" className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="txt">Text</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>

        {/* {isLoading && (
          <div className="flex flex-col gap-8 w-full items-center mt-24">
            <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
            <div className="text-2xl">Loading your files...</div>
          </div>
        )} */}

        <TabsContent value="grid">
          <div className="grid grid-cols-4 gap-4">
            {/* {modifiedFiles?.map((file) => {
              return <FileCard key={file._id} file={file} />;
            })} */}
            {files?.map((file) => {
              return <FileCard key={file.id} file={file} />;
            })}
          </div>
        </TabsContent>
        <TabsContent value="table">
          {/* <DataTable columns={columns} data={modifiedFiles} /> */}
        </TabsContent>
      </Tabs>

      {/* {files?.length === 0 && <Placeholder />} */}
    </div>
  );
}