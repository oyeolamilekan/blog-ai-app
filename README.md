# AI Blog Summarizer

This project is a Next.js application that uses AI to summarize blog articles. It scrapes content from a given URL, extracts key information using an AI model, and displays the summary, key points, action items, lessons, and a thumbnail from the article.

It also features a promotional banner for &lt;AppState/&gt;.

## Features

-   Scrape blog articles using Firecrawl.
-   Extract structured information (summary, key points, etc.) using the Vercel AI SDK with an OpenAI model.
-   Extract article thumbnail (og:image or twitter:image).
-   Display results in a user-friendly interface.

## Prerequisites

-   Node.js (v20.x or later recommended)
-   npm or yarn

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add the following environment variables:

    ```env
    FIRECRAWL_API_KEY=your_firecrawl_api_key
    OPENAI_API_KEY=your_openai_api_key
    ```

    *   `FIRECRAWL_API_KEY`: Get this from [firecrawl.dev](https://firecrawl.dev).
    *   `OPENAI_API_KEY`: Your API key for OpenAI services.

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    # yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `src/app/page.tsx`: Main entry point of the application, fetches tagline and renders the `Index` component.
-   `src/app/actions.ts`: Server actions, including `summarizeArticleAction` which handles scraping and AI processing.
-   `src/components/Index.tsx`: Main UI component that includes the input form and results display.
-   `src/components/ResultSection.tsx`: Component to display the summarized article content and thumbnail.
-   `src/components/UrlInput.tsx`: Component for the URL input field.

## Customization

-   **AI Model**: The AI model can be changed in `src/app/actions.ts` (currently `gpt-4o-mini`).
-   **Styling**: Tailwind CSS is used for styling. You can modify styles in the respective components or in `src/app/globals.css`.