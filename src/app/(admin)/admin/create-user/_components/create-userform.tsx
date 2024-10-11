"use client";

import React from "react";

import { useState } from "react";

import { TriangleAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateToken } from "@/features/verification/api/use-create-token";
import { Department, Post } from "@prisma/client";

export default function CreateUserForm({ posts , departments }: { posts: Post[] , departments:Department[]}) {
  const [email, setEmail] = useState("");

  const params = useSearchParams();
  const error = params.get("error");

  const { mutate } = useCreateToken();
 
  const [post ,setPost] = useState<{id:string , name:string}[] |null>(null)


  const handelSetPost = async (data :string) => {

    const values  = await JSON.parse(data) as {id:string , name:string}

    // setPost(pre=>({

    // }))
       
  }

  function onSend() {
    mutate({
      departmentId: "6708c23565133d2ea5fab8d3",
      departmentName: "bhopal",
      email,
      post: ["6708c23565133d2ea5fab8d3"],
    });
  }

  return (
    <div>
      <h1 className="font-bold text-lg text-black  mb-3">Create User</h1>
      <Card className=" p-6 md:w-[40vw] ">
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert className="size-4" />
            <p>Invalid email or password</p>
          </div>
        )}
        <CardContent className="space-y-5 px-0 pb-0 ">
          <form onSubmit={onSend} className="space-y-2.5">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
            />

            <div className="flex w-full flex-wrap gap-y-3">
              {/* Dropdown */}
              {/* <div className="rounded h-20">

              </div> */}
              <Select onValueChange={handelSetPost}>
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent className="">
                  {posts.map((post) => {
                    return (
                      <>
                        <SelectItem   value={post.id}>

                        {post.name}
                        </SelectItem>
                      </>
                    );
                  })}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="space-y-1">
                 {departments.map(departments=>{
                  return <>
                  <SelectItem className="w-full border " value={departments.id} >
                    <div className="flex  w-full gap-10
                     ">
                       <span>{departments.departmentName}</span>
                        
                    </div>
                    <div>{departments.address}</div>
                  </SelectItem>
                  </>
                 })}
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
  );
}
