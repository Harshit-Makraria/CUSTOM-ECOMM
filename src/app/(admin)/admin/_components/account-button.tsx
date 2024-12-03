"use client";

import React from "react";

import { CaretSortIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useGetAccountsDetails } from "@/features/account/use-get-accounts";
import { Post } from "@prisma/client";
import { useEmployeeDetail } from "../_utils/employee-provider";

const Item = ({
  branch,
  posts,
  isActive = false,
}: {
  branch: any | null;
  posts: Post[];
  isActive?: boolean;
}) => {
  return (
    <DropdownMenuItem className={`${isActive && "bg-muted"}`}>
      <div className="flex flex-col gap-3">
        {branch && (
          <div className=" flex justify-between gap-1">
            <span className="text-black font-semibold">{branch.city}</span>
            <span>{branch.address}</span>
          </div>
        )}
        <div>
          {posts?.map((post) => {
            return <span key={post.id}>{post.name}</span>;
          })}
        </div>
      </div>
    </DropdownMenuItem>
  );
};

export default function AccountButton() {
  const { accounts: data, activeAccount } = useEmployeeDetail();

  if (data == undefined || data.length == 0) return;
  return (
    <>
      <DropdownMenu  >
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Button variant="outline" asChild>
            <div className="flex justify-between gap-3 text-black">
              <span className="font-semibold">Account&quot;s</span>

              <CaretSortIcon fontSize={20} />
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-80" align="start">
          {activeAccount && (
            <>
              <DropdownMenuLabel># Active Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <Item
                branch={activeAccount.branch}
                posts={activeAccount.post!}
                isActive={true}
              />
            </>
          )}
          <DropdownMenuSeparator />

          <DropdownMenuLabel className="mt-1"># Department&quot;s</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {data?.map(({ branch, post }) => {
            return (
              <Item key={branch?.id} branch={branch} posts={post} />
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
