"use client";

import React from "react";
import { BookOpen, ListCheck, Circle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export interface SummaryResult {
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  lessons: string[];
  thumbnailUrl?: string;
}

interface ResultSectionProps {
  result: SummaryResult | null;
}

const ResultSection: React.FC<ResultSectionProps> = ({ result }) => {
  if (!result) return null;

  const copyContent = (content: string[], title: string) => {
    const text = content.join('\n\n');
    navigator.clipboard.writeText(text);
    console.log(`${title} copied to clipboard`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-8">
      <div className="result-card">
        <h2 className="text-2xl font-medium tracking-tighter mb-4">Summary</h2>
        <p className="leading-relaxed">{result.summary}</p>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium tracking-tighter">Extracted Results</h2>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1.5"
              onClick={() => copyContent([
                ...result.keyPoints, 
                ...result.actionItems, 
                ...result.lessons
              ], 'All content')}
            >
              <Copy size={14} />
              Copy All
            </Button>
          </div>
          
          <Tabs defaultValue="keyPoints" className="w-full">
            <TabsList className="bg-muted p-1 rounded-lg mb-6">
              <TabsTrigger value="keyPoints" className="flex items-center gap-2">
                <Circle size={16} />
                Key Points
              </TabsTrigger>
              <TabsTrigger value="lessons" className="flex items-center gap-2">
                <BookOpen size={16} />
                Lessons
              </TabsTrigger>
              <TabsTrigger value="actionItems" className="flex items-center gap-2">
                <ListCheck size={16} />
                Action Items
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="keyPoints" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Key Points</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-1.5"
                  onClick={() => copyContent(result.keyPoints, 'Key Points')}
                >
                  <Copy size={14} />
                </Button>
              </div>
              <div className="space-y-3">
                {result.keyPoints.map((point, index) => (
                  <div
                    key={`key-${index}`}
                    className="p-4 bg-card rounded-lg border border-border"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <p className="text-sm ">{point}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="lessons" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Lessons</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-1.5"
                  onClick={() => copyContent(result.lessons, 'Lessons')}
                >
                  <Copy size={14} />
                </Button>
              </div>
              <div className="space-y-3">
                {result.lessons.map((lesson, index) => (
                  <div
                    key={`lesson-${index}`}
                    className="p-4 bg-card rounded-lg border border-border"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <p className="text-sm ">{lesson}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="actionItems" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Action Items</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-1.5"
                  onClick={() => copyContent(result.actionItems, 'Action Items')}
                >
                  <Copy size={14} />
                </Button>
              </div>
              <div className="space-y-3">
                {result.actionItems.map((item, index) => (
                  <div
                    key={`action-${index}`}
                    className="p-4 bg-card rounded-lg border border-border"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <p className="text-sm ">{item}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
