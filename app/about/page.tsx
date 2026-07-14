import { AboutContent } from "@/components/pages/AboutContent";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata(
  "About",
  "Independent by design. We are a global-minded game studio based in Istanbul, building bold entertainment for a connected world.",
  "/about"
);

export default function AboutPage() {
  return <main><AboutContent /></main>;
}
