import { DevelopersContent } from "@/components/pages/DevelopersContent";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata(
  "Developers",
  "IFGT Developers is the open gateway for tools, creative partnerships, and the future of play.",
  "/developers"
);

export default function DevelopersPage() {
  return <main><DevelopersContent /></main>;
}
