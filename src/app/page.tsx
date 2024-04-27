// import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";

const mockUrls = [
  "https://utfs.io/f/392f0773-e9a2-4d88-933c-27d10263e504-rqywbb.avif",
  "https://utfs.io/f/9d292999-91d0-4c44-838c-de49fba4c9b1-gm1jgl.avif",
  "https://utfs.io/f/44c48791-977f-4699-ae4b-53094c40a5d0-fsf3yp.avif",
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const postData = await db.query.posts.findMany();

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {postData.map((post) => {
          return <p key={post.id}>{post.name}</p>;
        })}

        {[...mockUrls, ...mockUrls, ...mockUrls, ...mockUrls].map(
          (image, ind) => {
            return (
              <div key={ind} className="w-56">
                <Image src={image} alt={String(ind)} width={500} height={360} />
              </div>
            );
          },
        )}
      </div>
    </main>
  );
}
