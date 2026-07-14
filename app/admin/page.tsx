import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { ContentManager } from "@/components/admin/ContentManager";
import { OtherContentManager } from "@/components/admin/OtherContentManager";
import { SiteSettings } from "@/components/admin/SiteSettings";
export default function AdminPage() { return <><AdminDashboard/><div className="-mt-20 bg-[#050505] px-5 pb-20 sm:px-8"><div className="mx-auto max-w-6xl"><ContentManager/><OtherContentManager/><SiteSettings/></div></div></>; }
