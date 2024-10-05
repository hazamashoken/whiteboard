"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { signInGoogle } from "@/lib/auth/signin";

export function LoginCard() {
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await signInGoogle();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome to WhiteBoard</CardTitle>
        <CardDescription>
          Please log in to access your courses and materials.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <Button type="submit" className="w-full">
            Login Via Google
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <a href="#" className="text-sm text-primary hover:underline">
          Forgot password?
        </a> */}
        <a href="#" className="text-sm text-primary hover:underline">
          Need help?
        </a>
      </CardFooter>
    </Card>
  );
}
