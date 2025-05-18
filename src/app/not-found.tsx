
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#FAFAFA]">
      <h1 className="text-5xl font-bold tracking-tighter mb-4 text-primary">404</h1>
      <p className="text-2xl font-medium mb-8 text-primary">Page not found</p>
      <p className="text-secondary max-w-md mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">
          Return home
        </Link>
      </Button>
    </div>
  );
}
