
"use client";

import React from 'react'

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TriangleAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 
export default function CreateUserForm() {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useSearchParams();
  const error = params.get("error");

  const onCredentialSignIn = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
  

    signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/create-user",
    });

  };

  return (
    
    <div >
      <h1 className='font-bold text-lg text-black  mb-3'>Create User</h1>
    <Card className=" p-6 w-[40vw] ">
      
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>Invalid email or password</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0 ">
        <form onSubmit={onCredentialSignIn} className="space-y-2.5">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          
          <div className="flex w-full flex-wrap gap-y-3">
  {/* Dropdown */}
  <Select>
  <SelectTrigger >
    <SelectValue placeholder="Role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light"></SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
     
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Department" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Bhopal</SelectItem>
    <SelectItem value="dark">Indore</SelectItem>
    <SelectItem value="system">Delhi</SelectItem>
  </SelectContent>
</Select>
  
</div>

          <Button type="submit" className="w-full" size="lg">
            Send
          </Button>
        </form>
        

      </CardContent>
    </Card>
    </div>
  )
}
