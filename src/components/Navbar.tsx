"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed right-0 left-0 top-0 w-full bg-zinc-50 dark:bg-zinc-800 shadow-xl z-50">
      <div className="w-full max-w-10/12 py-2 flex items-center justify-center  mx-auto">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/logo.webp"
            alt="logo"
            width={50}
            height={50}
            className="size-13 md:size-20"
          />
        </Link>
      </div>
    </div>
  );
}
