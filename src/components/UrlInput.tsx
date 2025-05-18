"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setError("");
    onSubmit(url);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="input-container p-1 flex items-center">
          <Input
            type="text"
            placeholder="Enter blog URL (e.g., https://example.com/blog-post)"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            className="border-0 shadow-none focus-visible:ring-0 h-14 text-base px-4 placeholder:text-muted-foreground bg-transparent"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-white hover:bg-white/90 text-black px-6 h-12 rounded-lg ml-2"
          >
            {isLoading ? "Analyzing..." : "Summarize"}
          </Button>
        </div>
        {error && <p className="text-destructive text-sm pl-2">{error}</p>}
      </form>
    </div>
  );
};

export default UrlInput;
