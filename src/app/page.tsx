// import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const imagesData = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
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
    </main>
  );
}
