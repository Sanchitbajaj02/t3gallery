import ImageComponent from "~/components/core/imageComponent";
import { Modal } from "./modal";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  return (
    <>
      <Modal>
        <ImageComponent photoId={idAsNumber} />
      </Modal>
    </>
  );
}
