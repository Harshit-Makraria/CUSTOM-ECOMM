'use client'

import React from "react";
 
import { verificationColumns } from "./column";
import { useGetTokens } from "@/features/verification/api/use-get-tokens";
import { DataTable } from "./data-table";

export default function DisplayVerificationToken() {
  const { data, isLoading } = useGetTokens();

  return (
    <div>
      {
        <DataTable
          columns={verificationColumns}
          data={data ?? []}
          filterKey={"email"}
          isLoading={isLoading}
        />
      }
    </div>
  );
}
