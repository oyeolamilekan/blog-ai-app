"use client";

import React, { useState } from "react";
import UrlInput from "@/components/UrlInput";
import ResultSection, { SummaryResult } from "@/components/ResultSection";
import { summarizeArticleAction } from "@/app/actions";
import { toast } from "sonner";

interface IndexProps {
  tagline: string;
}

const builtWithTools = [
  { name: "Next.js", link: "https://nextjs.org/", logoPlaceholder: "N" },
  { name: "React", link: "https://react.dev/", logoPlaceholder: "R" },
  { name: "TypeScript", link: "https://www.typescriptlang.org/", logoPlaceholder: "TS" },
  { name: "Tailwind CSS", link: "https://tailwindcss.com/", logoPlaceholder: "T" },
  { name: "Vercel AI SDK", link: "https://sdk.vercel.ai/", logoPlaceholder: "AI" },
  { name: "OpenAI", link: "https://openai.com/", logoPlaceholder: "O" },
  { name: "Firecrawl", link: "https://firecrawl.dev/", logoPlaceholder: "F" },
  { name: "Shadcn/ui", link: "https://ui.shadcn.com/", logoPlaceholder: "S" },
  { name: "Lucide Icons", link: "https://lucide.dev/", logoPlaceholder: "L" },
  { name: "Sonner (Toasts)", link: "https://sonner.emilkowal.ski/", logoPlaceholder: "🔔" },
];

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
    <div className="min-h-screen bg-[#FAFAFA] px-4 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <a 
          href="https://mvp.appstate.co" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block mb-12 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="p-6 bg-white text-black border border-black rounded-lg text-center">
            <h2 className="text-2xl font-semibold">&lt;AppState/&gt;: Build your MVP in two weeks!</h2> 
            <p className="text-lg mt-2 text-gray-700">{tagline}</p>
          </div>
        </a>

        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-primary mb-3">
            AI Blog Summarizer
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Enter any blog URL to get an AI-generated summary, key points, action items, and lessons.
          </p>
        </header>

        <UrlInput onSubmit={handleSubmit} isLoading={isLoading} />
        
        {isLoading && (
          <div className="flex justify-center mt-12">
            <div className="w-12 h-12 rounded-full border-4 border-secondary border-t-accent animate-spin"></div>
          </div>
        )}
        
        <ResultSection result={result} />

        {/* "Built With" Section - Reverted to simpler version */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-medium text-center text-primary mb-12">
            Built With
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {builtWithTools.map((tool) => (
              <a 
                key={tool.name} 
                href={tool.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                {/* Logo Placeholder */}
                <div className="w-12 h-12 mb-3 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full group-hover:bg-gray-200 transition-colors duration-200">
                  <span className="text-xl font-semibold">{tool.logoPlaceholder}</span>
                </div>
                <p className="text-sm font-medium text-primary text-center">{tool.name}</p>
              </a>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Index;
