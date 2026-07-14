import { cn } from "@/lib/utils";
export function Container({ className, children }: React.PropsWithChildren<{ className?: string }>) { return <div className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12", className)}>{children}</div>; }
