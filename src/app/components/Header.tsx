'use client'

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import GitHubIcon from "../utils/icons/github";

export default function Header() {
  const pathname = usePathname();
  const params = useParams();
  const { name } = params as { name?: string };

  let pageTitle = "";

  if (pathname.startsWith("/pages/profile")) {
    pageTitle = " Profile";
  } else if (pathname.startsWith("/pages/repository/") && name) {
    pageTitle = ` ${name}`;
  }

  return (
    <div className="h-[60px] bg-black">
        <div className="max-w-6xl mx-auto flex items-center justify-start text-white pt-3 px-4">
            <Link href="/" className=" text-xl md:text-3xl flex gap-8 items-center">
            <GitHubIcon />
            <p className="font-semibold">GitHub</p>
            {pageTitle && (
                <>
                <p>/</p>
                <p className="text-gray-300 text-sm">{pageTitle}</p>
                </>
            )}
            </Link>
        </div>
    </div>
  );
}
