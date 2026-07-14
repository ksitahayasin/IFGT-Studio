import { ContactContent } from "@/components/pages/ContactContent";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata(
  "Contact",
  "Let's start a conversation. For media, partnerships, or a thoughtful introduction, the right person at IFGT is listening.",
  "/contact"
);

export default function ContactPage() {
  return <main><ContactContent /></main>;
}
