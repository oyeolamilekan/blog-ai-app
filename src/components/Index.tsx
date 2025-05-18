"use client";

import React, { useState } from "react";
import UrlInput from "@/components/UrlInput";
import ResultSection, { SummaryResult } from "@/components/ResultSection";
import { summarizeArticleAction } from "@/app/actions";
import { toast } from "sonner";
import { Button } from "./ui/button";
import TopBar from "./TopBar";

interface IndexProps {
  tagline: string;
}

const Index: React.FC<IndexProps> = ({ tagline }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("url", url);
      
      const data = await summarizeArticleAction(formData);
      setResult(data);
      toast.success("Article successfully summarized");
    } catch (error) {
      console.error("Error summarizing article:", error);
      toast.error("Failed to summarize article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <div className="px-4 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-3">
              AI Blog Summarizer
            </h1>
          </header>

          <div className="w-full max-w-3xl mx-auto">
            <a 
              href="https://mvp.appstate.co" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block mb-12 rounded-lg transition-shadow duration-300"
            >
              <div className="p-6 bg-card text-foreground border border-border rounded-lg text-center">
                <h2 className="text-2xl font-semibold">&lt;AppState/&gt;: Build your MVP in two weeks!</h2> 
                <p className="text-lg mt-2 text-secondary">{tagline}</p>
              </div>
            </a>
          </div>

          <UrlInput onSubmit={handleSubmit} isLoading={isLoading} />
          
          {isLoading && (
            <div className="flex justify-center mt-12">
              <div className="w-12 h-12 rounded-full border-4 border-secondary border-t-accent animate-spin"></div>
            </div>
          )}
          
          <ResultSection result={result} />
        </div>
      </div>
    </div>
  );
};

export default Index;
