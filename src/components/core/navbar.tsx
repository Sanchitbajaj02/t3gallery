import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { UploadButton } from "~/utils/uploadthing";
import Link from "next/link";
import SimpleUploadButton from "./simpleUploadButton";

export default function TopNavbar() {
  return (
    <nav className="flex w-full items-center justify-between border-b px-8 py-4 text-xl font-semibold">
      <Link href={"/"} className="cursor-pointer">
        Gallery
      </Link>
      <div className="flex flex-row items-center justify-center gap-4">
        <SignedOut>
          <div className="rounded bg-white px-4 py-1 text-base text-black hover:bg-gray-100">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          {/*<UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
              router.refresh();
            }}
            className="text-base"
          />*/}

          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
