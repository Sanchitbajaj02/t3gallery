// import Link from "next/link";
import Image from "next/image";

const mockUrls = [
  "https://utfs.io/f/392f0773-e9a2-4d88-933c-27d10263e504-rqywbb.avif",
  "https://utfs.io/f/9d292999-91d0-4c44-838c-de49fba4c9b1-gm1jgl.avif",
  "https://utfs.io/f/44c48791-977f-4699-ae4b-53094c40a5d0-fsf3yp.avif",
];

const mockImages = mockUrls.map((url: string, index: number) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages, ...mockImages].map(
          (image) => {
            return (
              <div key={image.id} className="w-56">
                <Image
                  src={image.url}
                  alt={String(image.id)}
                  width={500}
                  height={360}
                />
              </div>
            );
          },
        )}
      </div>
    </main>
  );
}
