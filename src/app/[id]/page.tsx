import { notFound } from "next/navigation";
import Link from "next/link";
import CommentsSection from "../components/CommentsSection";

type Blog = {
  id: string;
  title: string;
  body: string;
};

async function getBlog(id: string): Promise<Blog | undefined> {
  const res = await fetch("https://jsonfakery.com/blogs");
  const blogs: Blog[] = await res.json();
  return blogs.find((b) => b.id === id);
}

export default async function Page({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);
  if (!blog) notFound();

  return (
    <>
      <article className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md mb-8 p-8">
        <Link href="/" className="text-white hover:underline">
          &larr; Späť na hlavný blog
        </Link>

        <h1 className="text-4xl font-bold mb-4 mt-2">{blog.title}</h1>
        <p className="text-gray-700 leading-relaxed">{blog.body}</p>
      </article>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded p-4 rounded mb-8">
        <CommentsSection articleId={blog.id} />
      </section>
    </>
  );
}
