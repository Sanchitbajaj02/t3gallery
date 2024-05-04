import React from "react";
import { getSingleImage } from "~/server/queries";

export default async function SingleCardImage({
  photoId,
}: {
  photoId: number;
}) {
  const image = await getSingleImage(photoId);

  return (
    <>
      <section className="flex h-full w-full min-w-0">
        <article className="flex flex-shrink items-center justify-center">
          <img src={image.url} alt={image.name} className="object-cover" />
        </article>

        <article className="flex w-2/5 flex-shrink-0 flex-col border-l ml pl-4">
          <p className="text-xl font-bold">{image.name}</p>
          <p>{image.url}</p>
        </article>
      </section>
    </>
  );
}
