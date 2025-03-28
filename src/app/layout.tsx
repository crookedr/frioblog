import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

import Link from "next/link";
import LogoutButton from "./components/LogoutButton";
import Providers from "./providers";

// Import pre Next.js <Image>
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "FRIO Blog",
  description: "Jednoduchý blog v Next.js 13",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Server-side session na zobrazenie mena v hlavičke
  const session = await getServerSession(authOptions);

  return (
    <html lang="sk" className={inter.className}>
      <body className="bg-black text-gray-100 min-h-screen flex flex-col">
        <Providers>
          <header className="sticky top-0 bg-black text-white shadow z-10">
            <div className="max-w-5xl mx-auto flex items-center p-4">
              {/* Logo naľavo */}
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="FRIO Logo"
                  width={150}
                  height={50}
                  priority
                />
              </Link>

              {/* Pravá časť: navigácia + prihlasovanie */}
              <div className="flex items-center ml-auto gap-4">
                {/* Navigácia */}
                <nav className="space-x-4">
                  <Link href="/" className="hover:text-blue-600 font-medium">
                    Domov
                  </Link>
                  <Link
                    href="/about"
                    className="hover:text-blue-600 font-medium"
                  >
                    O nás
                  </Link>
                  <Link
                    href="/contact"
                    className="hover:text-blue-600 font-medium"
                  >
                    Kontakt
                  </Link>
                </nav>

                {/* Prihlásenie / Odhlásenie */}
                <div className="flex items-center gap-2">
                  {session ? (
                    <>
                      <span>{session.user?.name ?? "Používateľ"}</span>
                      <LogoutButton />
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="bg-blue-600 px-3 py-1 rounded"
                    >
                      Prihlásiť sa
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-5xl mx-auto p-4 flex-grow">{children}</main>

          {/* KONTAKT + MAPA */}
          <section className="bg-black">
            <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ľavý stĺpec: kontakt, adresa, telefón */}
              <div>
                <h3 className="text-xl font-bold mb-4">Kde nás nájdeš?</h3>
                <p className="mb-2">
                  FRIO s.r.o.
                  <br />
                  Horný Šianec 29
                  <br />
                  911 01 Trenčín
                </p>
                <p className="mb-2">Tel: +421 948 199 825</p>
                <p className="mb-2">
                  Email:{" "}
                  <a
                    href="mailto:ahoj@frio.sk"
                    className="text-blue-600 hover:underline"
                  >
                    ahoj@frio.sk
                  </a>
                </p>
              </div>

              {/* Pravý stĺpec: Google Maps iframe */}
              <div>
                <h3 className="text-xl font-bold mb-4">Tešíme sa na teba</h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.3819718116683!2d18.03931477677385!3d48.88905719854755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714a1879e6b608f%3A0x8534b1ad0e31526d!2sFrio!5e0!3m2!1ssk!2ssk!4v1741777714477!5m2!1ssk!2ssk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>

          <footer className="p-4 bg-black shadow mt-8 text-center">
            <p className="text-sm text-gray-500">
              &copy; 2025 FRIO Blog. Všetky práva vyhradené.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
