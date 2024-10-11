'use client'

import React from "react";
 
import {  departmentColumns } from "./column";
import { useGetTokens } from "@/features/verification/api/use-get-tokens";
import { DataTable } from "./data-table";
import { useGetDepartment } from "@/features/departments/api/use-get-department";


export default function DisplayDepartments() {

  const { data, isLoading } = useGetDepartment();

  return (
    <div>
      {
        <DataTable
          columns={departmentColumns}
          data={data ?? []}
          filterKey={"departmentName"}
          isLoading={isLoading}
        />
      }
    </div>
  );
}
