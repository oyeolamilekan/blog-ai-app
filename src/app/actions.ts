"use server";

import { SummaryResult } from "@/components/ResultSection";
import FirecrawlApp from "@mendable/firecrawl-js";
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

// Define the Zod schema for the SummaryResult, ensuring fields are non-optional
const summaryResultSchema = z.object({
  summary: z.string().min(1, "Summary cannot be empty"),
  keyPoints: z.array(z.string().min(1, "Key point cannot be empty")).min(1, "Must have at least one key point"),
  actionItems: z.array(z.string().min(1, "Action item cannot be empty")).min(1, "Must have at least one action item"),
  lessons: z.array(z.string().min(1, "Lesson cannot be empty")).min(1, "Must have at least one lesson"),
  thumbnailUrl: z.string().url("Invalid URL format for thumbnail").optional(),
});

// Infer the type for data returned by AI (without thumbnailUrl)
const aiGeneratedDataSchema = summaryResultSchema.omit({ thumbnailUrl: true });
type AiGeneratedData = z.infer<typeof aiGeneratedDataSchema>;

// Helper function to extract meta tag content
const extractMetaTagContent = (html: string, property: string): string | undefined => {
  const regex = new RegExp(`<meta (?:name|property)="${property}" content="([^"]*)"`);
  const match = html.match(regex);
  return match?.[1];
};

export async function summarizeArticleAction(formData: FormData): Promise<SummaryResult> {
  const url = formData.get("url") as string;

  if (!process.env.FIRECRAWL_API_KEY) {
    throw new Error("FIRECRAWL_API_KEY is not set in environment variables.");
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment variables.");
  }

  const firecrawlApp = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

  let thumbnailUrl: string | undefined;
  let markdownContent: string | undefined;

  try {
    console.log(`Scraping URL: ${url} for markdown and html`);
    const scrapeResponse = await firecrawlApp.scrapeUrl(url, {
      formats: ['markdown', 'html'], // Request both markdown and HTML
    });

    if (scrapeResponse.success) {
      // Extract Markdown
      if ('markdown' in scrapeResponse && typeof (scrapeResponse as { markdown?: string }).markdown === 'string') {
        const potentialMarkdown = (scrapeResponse as { markdown: string }).markdown;
        if (potentialMarkdown.trim() !== '') {
          markdownContent = potentialMarkdown;
        }
      }
      if (!markdownContent) {
        console.warn("Markdown was not found or was empty on scrapeResponse.", scrapeResponse);
      }

      // Extract Thumbnail from HTML
      if ('html' in scrapeResponse && typeof (scrapeResponse as { html?: string }).html === 'string') {
        const htmlContent = (scrapeResponse as { html: string }).html;
        if (htmlContent) {
          thumbnailUrl = extractMetaTagContent(htmlContent, 'og:image') || 
                         extractMetaTagContent(htmlContent, 'twitter:image');
          if (thumbnailUrl) {
            console.log(`Found thumbnail URL: ${thumbnailUrl}`);
          }
        }
      }
    } else {
      console.error("Scraping failed:", scrapeResponse.error, scrapeResponse);
      throw new Error(`Scraping failed: ${scrapeResponse.error || 'Unknown error'}`);
    }

    if (!markdownContent) {
      console.error("Failed to obtain valid markdown content after scraping.", scrapeResponse);
      throw new Error("Markdown content not found or empty after successful scrape.");
    }

    console.log("Markdown scraped successfully. Length:", markdownContent.length);
    if (process.env.NODE_ENV === 'development') {
        console.log(markdownContent);
    }

    const { object: summaryDataFromAI } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: aiGeneratedDataSchema, // Use the schema without thumbnailUrl for AI part
      prompt: `
      Analyze the following article content (in markdown format) and extract:

      1. A detailed summary of the article:
      Provide a clear overview of the main topic covered, including the problem it addresses, the proposed solutions, and any relevant context.

      Highlight key arguments, data points, or case studies mentioned.

      Include notable quotes from the article to capture the author's voice.

      2. Key points discussed:
      List and explain each major idea presented in the article.

      Break down complex concepts in simple terms.

      Mention any subtopics or related ideas the article explores.

      3. Actionable items or takeaways for the reader:
      Identify specific, practical steps the reader can apply.

      Include any recommended tools, techniques, or strategies.

      Highlight any "do's" and "don'ts" mentioned by the author.

      4. Important lessons learned from the article:
      Summarize the most impactful insights the article offers.

      Share any counterintuitive advice or lessons learned from the author's experience.

      Use direct quotes where possible to emphasize key lessons.
      ${markdownContent}`,
    });

    console.log("AI SDK processing complete.");
    
    const validatedAiData = summaryDataFromAI as AiGeneratedData;

    // Combine AI-generated data with the programmatically extracted thumbnail
    const finalResult: SummaryResult = {
      summary: validatedAiData.summary,
      keyPoints: validatedAiData.keyPoints,
      actionItems: validatedAiData.actionItems,
      lessons: validatedAiData.lessons,
      thumbnailUrl,
    };

    return finalResult;

  } catch (error) {
    console.error("Error in summarizeArticleAction:", error);
    if (error instanceof Error) {
      throw new Error(`Processing failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred during processing.");
  }
}
