import { SupportContent } from "@/components/pages/SupportContent";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata(
  "Support",
  "Find answers, manage your IFGT ID, or talk to a member of our support team.",
  "/support"
);

export default function SupportPage() {
  return <main><SupportContent /></main>;
}
