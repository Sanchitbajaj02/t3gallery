import SingleCardImage from "~/components/core/singleCardImage";
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
        <SingleCardImage photoId={idAsNumber} />
      </Modal>
    </>
  );
}
