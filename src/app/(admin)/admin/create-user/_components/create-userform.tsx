"use client";

import React, { FormEvent, Fragment } from "react";

import { useState } from "react";

import { TriangleAlert } from "lucide-react";
 

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
import { Branch, Post } from "@prisma/client";

export default function CreateUserForm({
  posts,
  branchs,
}: {
  posts: Post[];
  branchs: Branch[];
}) {
  const [email, setEmail] = useState("");

 

  const { mutate  } = useCreateToken();

  const [post, setPost] = useState<string[]>([]);
  const [branchIds, setDepartmentsIds] = useState<string[]>([]);
  const handelSetPost = async (data: string) => {
    setPost(pre=>[data]);
  };
  const handelSetDepartments = async (data: string) => {
    setDepartmentsIds(pre=> [data]);
  };

  function onSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    mutate({
      branchIds: branchIds.length == 0 ? undefined : branchIds,
      email,
      post: post.length == 0 ? undefined : post,
    });
  }

  return (
    <div>
      <h1 className="font-bold text-lg text-black  mb-3">Create User</h1>
      <Card className=" p-6 md:w-[40vw] ">
      
        <CardContent className="space-y-5 px-0 pb-0 ">
          <form onSubmit={onSend} className="space-y-2.5">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
              className="placeholder:text-black"
            />

            <div className="flex w-full flex-wrap gap-y-3">
              {/* Dropdown */}
              {/* <div className="rounded h-20">

              </div> */}
              <Select onValueChange={handelSetPost} required>
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent className="">
                  {posts.map((post) => {
                    return (
                      <Fragment key={post.id}>
                        <SelectItem  value={post.id}>{post.name}</SelectItem>
                      </Fragment>
                    );
                  })}
                </SelectContent>
              </Select>

              <Select onValueChange={handelSetDepartments} >
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="space-y-1">
                  {branchs.map((departments) => {
                    return (
                      <React.Fragment key={departments.id}>
                        <SelectItem
                          className="w-full border "
                          value={departments.id}
                        >
                          <div
                            className="flex  w-full gap-10
                     "
                          >
                            <span>{departments.name}</span>
                          </div>
                          <div>{departments.address}</div>
                        </SelectItem>
                      </React.Fragment>
                    );
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
