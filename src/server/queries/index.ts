import "server-only";
import { db } from "../db";
import { auth } from "@clerk/nextjs/server";

export async function getMyImages() {
  const currentUser = auth();
  console.log(currentUser);

  if (!currentUser.userId) throw new Error("Unauthorized");

  const imagesData = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, currentUser.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return imagesData;
}
