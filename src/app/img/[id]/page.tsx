import Image from "next/image";
import { getSingleImage } from "~/server/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getSingleImage(idAsNumber);

  return (
    <>
      <div className="mt-8 flex justify-center">
        <Image src={image.url} width={500} height={500} alt={image.name} />
      </div>
    </>
  );
}
