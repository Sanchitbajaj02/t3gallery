// import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries/index";

export const dynamic = "force-dynamic";

async function ImageComponent() {
  const imagesData = await getMyImages();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {imagesData.map((image, ind: number) => {
        return (
          <div key={ind} className="flex w-64 flex-col items-center">
            <Image
              src={image.url}
              alt={image.name}
              width={256}
              height={256}
              style={{ objectFit: "contain" }}
              loading="lazy"
            />
            <p className="text-base">{image.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedIn>
        <ImageComponent />
      </SignedIn>
      <SignedOut>
        <p className="h-full w-full text-center text-2xl">
          Please sign in to access
        </p>
      </SignedOut>
    </main>
  );
}
