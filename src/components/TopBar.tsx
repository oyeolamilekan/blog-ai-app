"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Triangle, Info, Moon, Sun, GitBranch } from "lucide-react";
import Link from "next/link";
// import { useTheme } from "@/contexts/ThemeContext"; // useTheme is not used if theme toggle is removed

const TopBar: React.FC = () => {
  // const { theme, toggleTheme } = useTheme(); // Not used if theme toggle is removed

  return (
    <div className="w-full px-4 py-3 flex justify-between items-center text-foreground">
      {/* Left Section */}
      <Button variant="ghost" size="icon" aria-label="Add new">
        <Plus className="h-5 w-5" />
      </Button>

      {/* Right Section */}
      <div className="flex items-center space-x-2 align-middle">
        <Link href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foyeolamilekan%2Fblog-ai-app" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="border-border hover:bg-muted">
            <Triangle className="h-4 w-4 fill-current md:mr-2" /> 
            <span className="hidden md:inline">Deploy with Vercel</span>
          </Button>
        </Link>
        <Link href="https://github.com/oyeolamilekan/blog-ai-app" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="border-border hover:bg-muted">
            <GitBranch className="h-4 w-4 fill-current md:mr-2" /> 
            <span className="hidden md:inline">Github Repo</span>
          </Button>
        </Link>
        {/* Add back Info and Theme toggle if needed, for example:
        <Button variant="ghost" size="icon" aria-label="Information">
          <Info className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
        */}
      </div>
    </div>
  );
};

export default TopBar; 