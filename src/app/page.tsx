// import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

async function ImageComponent() {
  const imagesData = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {[...imagesData, ...imagesData, ...imagesData, ...imagesData].map(
        (image, ind: number) => {
          return (
            <div key={ind} className="flex w-56 flex-col items-center">
              <Image
                src={image.url}
                alt={image.name}
                width={500}
                height={360}
              />
              <p className="text-base">{image.name}</p>
            </div>
          );
        },
      )}
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
