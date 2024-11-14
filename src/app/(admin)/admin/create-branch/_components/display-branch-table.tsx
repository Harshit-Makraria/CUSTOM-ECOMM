'use client'

import React from "react";
 
import {  branchColumns } from "./column";
import { DataTable } from "./data-table";
import { useGetBranchs } from "@/features/departments/api/use-get-branchs";


export default function DisplayDepartments() {

  const { data, isLoading } = useGetBranchs();
  console.log(data)
  return (
    <div>
      {
        <DataTable
          columns={branchColumns}
          data={data ?? []}
          filterKey={"name"}
          isLoading={isLoading}
        />
      }
    </div>
  );
}
