import { notFound } from "next/navigation";
import Link from "next/link";
import CommentsSection from "../components/CommentsSection";

type Blog = {
  id: string;
  title: string;
  body: string;
};

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = params;
  const res = await fetch("https://jsonfakery.com/blogs");
  const blogs: Blog[] = await res.json();

  const blog = blogs.find((b) => b.id === id);
  if (!blog) {
    notFound();
  }

  return (
    <>
      {/* BOX pre článok (gradient) */}
      <article className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md mb-8 p-8">
        <Link href="/" className="text-white hover:underline">
          &larr; Späť na hlavný blog
        </Link>

        <h1 className="text-4xl font-bold mb-4 mt-2">{blog.title}</h1>
        <p className="text-gray-700 leading-relaxed">{blog.body}</p>
      </article>

      {/* BOX pre komentáre */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded p-4 rounded mb-8">
        <CommentsSection articleId={blog.id} />
      </section>
    </>
  );
}
