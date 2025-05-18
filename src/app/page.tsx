import { Suspense } from "react";
import Index from "@/components/Index";

// Define the fixed tagline
const fixedTagline = "Build and launch your MVP product in just 2 weeks with AI-driven development.";

export default function Home() {
  return (
    <Suspense fallback={<div className="flex justify-center mt-12">
      <div className="w-12 h-12 rounded-full border-4 border-secondary border-t-accent animate-spin"></div>
    </div>}>
      {/* Pass the fixed tagline to the Index component */}
      <Index tagline={fixedTagline} />
    </Suspense>
  );
}
