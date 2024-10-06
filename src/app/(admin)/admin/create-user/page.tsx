"use client";


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

 const Userform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useSearchParams();
  const error = params.get("error");

  const onCredentialSignIn = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/create-user",
    });
  };

  

  return (
    <div className="flex justify-center items-center h-screen" style={{backgroundImage:`url("/bg.jpg")`}} >
    <Card className=" p-6 pt-10   mx-[30%] w-[40vw] h-96">
      <CardHeader className="px-0 pt-0 text-center">
        <CardTitle>
          Type Of User
        </CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>Invalid email or password</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0 pt-6">
        <form onSubmit={onCredentialSignIn} className="space-y-2.5">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <div className="flex ">
  {/* Dropdown */}
  <select className="p-2 border border-gray-300 rounded-lg w-full mx-2">
    <option value="">TYPE</option>
    <option value="option1">USER</option>
    <option value="option2">ADMIN</option>
    <option value="option3">MEMBER</option>
  </select>
     
  <select className="p-2 border border-gray-300 rounded-lg w-full mx-2">
    <option value="">DEPARTMENT </option>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </select>
  
</div>

          <Button type="submit" className="w-full" size="lg">
            Continue
          </Button>
        </form>
        

      </CardContent>
    </Card>
    </div>
  );
};
export default Userform;