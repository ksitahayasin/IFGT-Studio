"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
type Props = { href?: string; children: React.ReactNode; className?: string; variant?: "primary" | "secondary" };
export function Button({ href = "#", children, className, variant = "primary" }: Props) { return <Link href={href}><motion.span whileHover={{ y: -2, scale: 1.015 }} whileTap={{ scale: .98 }} className={cn("inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition", variant === "primary" ? "bg-electric text-white shadow-glow" : "border border-white/15 bg-white/5 text-white hover:bg-white/10", className)}>{children}</motion.span></Link>; }
