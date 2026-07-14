import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20">
      <h1 className="font-display text-[15vw] font-medium leading-none tracking-[-.1em] text-zinc-800 sm:text-[10vw]">
        404
      </h1>
      <p className="mt-6 text-xl text-zinc-400">
        This world doesn't exist yet.
      </p>
      <Link
        href="/"
        className="mt-8 flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
      >
        <ArrowLeft size={16} />
        Return home
      </Link>
    </Container>
  );
}
