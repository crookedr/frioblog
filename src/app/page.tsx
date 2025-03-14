import Link from "next/link";
import BlogList from "./components/BlogList";

type Blog = {
  id: number;
  title: string;
  body: string;
};

export default async function HomePage() {
  // Načíta články z API
  const res = await fetch("https://jsonfakery.com/blogs");
  const blogs: Blog[] = await res.json();

  return (
    <>
      {/* HERO sekcia */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md mb-8 p-8">
        <h2 className="text-4xl font-bold mb-4">Vitaj na FRIO blogu!</h2>
        <p className="mb-6 max-w-2xl">
          Prinášame ti najnovšie články, postrehy a inšpirácie zo sveta, ktorý
          ťa zaujíma. Prečítaj si, čo je nové a podeľ sa o svoje názory s
          komunitou.
        </p>
        <Link
          href="#blog-section"
          className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2 px-4 rounded"
        >
          Pozrieť články
        </Link>
      </section>

      {/* Zoznam článkov */}
      <section id="blog-section">
        <BlogList blogs={blogs} />
      </section>
    </>
  );
}
