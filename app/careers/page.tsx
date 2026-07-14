import { CareersContent } from "@/components/pages/CareersContent";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata(
  "Careers",
  "Come build what's next. The best work happens when talented people have room to care deeply.",
  "/careers"
);

export default function CareersPage() {
  return <main><CareersContent /></main>;
}
