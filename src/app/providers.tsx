"use client";

import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster"; // Assuming Toaster is a client component
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Assuming Sonner is a client component

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
      <TooltipProvider>
        <Toaster />
        <SonnerToaster />
        {children}
      </TooltipProvider>
  );
} 