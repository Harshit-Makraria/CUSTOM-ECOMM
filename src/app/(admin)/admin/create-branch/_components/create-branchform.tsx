"use client";

import React, { FormEvent, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useDepartmentToken } from "@/features/departments/api/use-create-branch";
 

export default function CreateDepartmentForm() {
  const [name, setDepartmentName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const params = useSearchParams();
  const error = params.get("error");

  const { mutate } = useDepartmentToken();

  function onSubmit( e :FormEvent<HTMLFormElement>) {
    e.preventDefault()
    mutate({
      name,
      address,
      city,
      pincode,
    } , {
      onSuccess(){
        setDepartmentName("");
        setAddress("");
        setCity("");
        setPincode("");
      }
    });

   
  }

  return (
    <div>
      <h1 className="font-bold text-lg text-black mb-3">Create Department</h1>
      <Card className="p-6 w-[40vw]">
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert className="size-4" />
            <p>{error}</p>
          </div>
        )}
        <CardContent className="space-y-5 px-0 pb-0">
          <form onSubmit={onSubmit} className="space-y-2.5">
            <Input
              value={name}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="Department Name"
              type="text"
              required
            />
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              type="text"
              required
            />
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              type="text"
              required
            />
            <Input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Pincode"
              type="number"
              required
            />
            <Button type="submit" className="w-full" size="lg">
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
