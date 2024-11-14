"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TriangleAlert } from "lucide-react";

import { useSignUp } from "@/features/auth/hooks/use-sign-up";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useGetToken } from "@/features/verification/api/use-get-token";
import { useEmployeeSignUp } from "@/features/auth/hooks/use-employee-sign-up";

const EmployeeSignUpCard = ({ searchParams }: { searchParams: { tokenId: string } }) => {
  const mutation = useEmployeeSignUp();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const tokenId = searchParams.tokenId;

  const { data } = useGetToken(tokenId);


  if (!data) {
    return (
      <>
        <div>somthing went wrong</div>
      </>
    );
  }

  const onCredentialSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      {
        name,
        email: data.email,
        password,
        post: data.post,
        branchIds:data.branchIds
      },
      {
        onSuccess: () => {
          signIn("credentials", {
            email: data.email,
            password,
            callbackUrl: "/admin",
          });
        },
      }
    );
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      {!!mutation.error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{mutation.error.message}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialSignUp} className="space-y-2.5 ">
          <Input
            disabled={true}
            value={data.email}
            className="text-black disabled:text-black placeholder:text-black"
            placeholder="Email"
            type="email"

          />
          <Input
            disabled={mutation.isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            type="text"
            required
          />
          <Input
            disabled={mutation.isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
            minLength={3}
            maxLength={20}
          />
          <Button
            disabled={mutation.isPending}
            type="submit"
            className="w-full"
            size="lg"
          >
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmployeeSignUpCard;
