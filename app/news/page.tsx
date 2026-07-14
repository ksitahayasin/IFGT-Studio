import { NewsContent } from "@/components/pages/NewsContent";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata(
  "News",
  "Stories from inside IFGT. Updates, ideas, and the people making the next generation of play.",
  "/news"
);

export default function NewsPage() {
  return <main><NewsContent /></main>;
}
