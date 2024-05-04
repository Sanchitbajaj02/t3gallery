import SingleCardImage from "~/components/core/singleCardImage";

export default function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  return (
    <>
      <div className="my-4 flex items-center justify-center">
        <SingleCardImage photoId={idAsNumber} />
      </div>
    </>
  );
}
