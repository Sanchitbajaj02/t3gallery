import { clerkClient } from "@clerk/nextjs/server";
import React from "react";
import { deleteImage, getSingleImage } from "~/server/queries";
import { Button } from "~/components/ui/button";

export default async function SingleCardImage({
  photoId,
}: {
  photoId: number;
}) {
  const image = await getSingleImage(photoId);

  const uploadUserInfo = await clerkClient.users.getUser(image.userId);

  const formAction = async ( ) => {
    "use server";

    await deleteImage(photoId);
  };

  return (
    <>
      <section className="flex h-full w-full min-w-0">
        <article className="flex flex-shrink items-center justify-center">
          <img src={image.url} alt={image.name} className="object-cover" />
        </article>

        <article className="flex w-2/5 flex-shrink-0 flex-col border-l">
          <p className="border-b p-2 text-center text-lg font-semibold">
            {image.name}
          </p>
          <div className="flex flex-col p-2">
            <span className="text-base font-medium">Uploaded by</span>
            <span className="text-base font-medium">
              {uploadUserInfo.fullName}
            </span>
          </div>

          <div className="flex flex-col p-2">
            <span className="text-base font-medium">Created On</span>
            <span className="text-base font-medium">
              {new Date(uploadUserInfo.createdAt).toLocaleDateString("en-GB")}
            </span>
          </div>

          <div className="p-2">
            <form action={formAction}>
              <Button variant="destructive" type="submit">
                Delete
              </Button>
            </form>
          </div>
        </article>
      </section>
    </>
  );
}
