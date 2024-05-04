"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";
import Link from "next/link";

export default function TopNavbar() {
  const router = useRouter();

  return (
    <nav className="flex w-full items-center justify-between border-b px-8 py-4 text-xl font-semibold">
      <Link href={"/"} className="cursor-pointer">Gallery</Link>
      <div className="flex flex-row justify-center gap-4">
        <SignedOut>
          <div className="rounded bg-white px-4 py-1 text-base text-black hover:bg-gray-100">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
              router.refresh();
            }}
          />

          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
