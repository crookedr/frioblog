"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Blog = {
  id: number;
  title: string;
  body: string;
};

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  // Počet článkov na 1 stranu
  const pageSize = 16;

  // Aktuálna strana (1, 2, 3, ...)
  const [currentPage, setCurrentPage] = useState(1);

  // Celkový počet strán
  const totalPages = Math.ceil(blogs.length / pageSize);

  // Slice indexy
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  // Funkcia na zmenu strany
  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Najnovšie články</h2>

      {/* Kontejner s animáciami */}
      <motion.div
        // Začiatočný a konečný stav celej grid sekcie
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 1 }, // len aby nebol fade-out, dám 1
          show: {
            opacity: 1,
            transition: {
              // Každé dieťa (article) sa zobrazí postupne
              staggerChildren: 0.15,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <AnimatePresence>
          {currentBlogs.map((blog) => (
            <motion.article
              key={blog.id}
              // Variants pre každý článok
              variants={{
                hidden: { opacity: 0, x: 100 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.75, // pomalšia animácia
                  },
                },
              }}
              exit={{ opacity: 0 }}
              className="bg-gradient-to-l from-black to-blue-500 text-white rounded-md mb-8 p-8"
            >
              <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
              <p className="text-white">
                {blog.body ? blog.body.slice(0, 80) : "No content"}...
              </p>
              <Link
                href={`/${blog.id}`}
                className="text-gray-200 hover:text-gray-100 hover:underline mt-2 inline-block"
              >
                Celý článok
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Navigácia stránkovania */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gradient-to-l from-black to-blue-500 text-white rounded-md cursor-pointer disabled:opacity-50"
        >
          &laquo; Späť
        </button>

        <span>
          Strana {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gradient-to-r from-black to-blue-500 text-white rounded-md cursor-pointer disabled:opacity-50"
        >
          Ďalej &raquo;
        </button>
      </div>
    </div>
  );
}
