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
import { BookOpen } from "lucide-react";
import { signInGoogle } from "@/lib/auth/signin";

export default function HomePage() {
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await signInGoogle();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold text-primary">WhiteBoard</span>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome to EduLearn</CardTitle>
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
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
            <a href="#" className="text-sm text-primary hover:underline">
              Need help?
            </a>
          </CardFooter>
        </Card>
      </main>

      <footer className="bg-white shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 WhiteBoard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
