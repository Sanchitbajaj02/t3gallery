import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function TopNavbar() {
  return (
    <nav className="flex w-full items-center justify-between border-b px-8 py-4 text-xl font-semibold">
      <div>Gallery</div>

      <div>
        <SignedOut>
          <div className="rounded bg-white px-4 py-1 text-base text-black hover:bg-gray-100">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
