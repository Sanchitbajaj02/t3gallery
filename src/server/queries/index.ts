import "server-only";
import { db } from "../db";
import { auth } from "@clerk/nextjs/server";

export async function getMyImages() {
  const currentUser = auth();

  if (!currentUser.userId) throw new Error("Unauthorized");

  const imagesData = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, currentUser.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return imagesData;
}

export async function getSingleImage(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.id, id), eq(model.userId, user.userId)),
  });

  if (!image) throw new Error("Image not found");

  return image;
}
