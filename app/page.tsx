import { BookOpen } from "lucide-react";
import { LoginCard } from "./_components/login-card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }
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
        <LoginCard />
      </main>

      <footer className="bg-white shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 WhiteBoard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
