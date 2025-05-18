"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Triangle, Info, Moon, Sun, GitBranch } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

const TopBar: React.FC = () => {

  return (
    <div className="w-full px-4 py-3 flex justify-between items-center text-foreground">
      {/* Left Section */}
      <Button variant="ghost" size="icon" aria-label="Add new">
        <Plus className="h-5 w-5" />
      </Button>

      {/* Right Section */}
      <div className="flex items-center space-x-2 align-middle">
        <Link href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%https://github.com/oyeolamilekan/blog-ai-app" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="border-border hover:bg-muted">
            <Triangle className="h-4 w-4 mr-2 fill-current" /> 
            Deploy with Vercel
          </Button>
        </Link>
        <Link href="https://github.com/oyeolamilekan/blog-ai-app" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="border-border hover:bg-muted">
            <GitBranch className="h-4 w-4 mr-2 fill-current" /> 
            Github Repo
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TopBar; 