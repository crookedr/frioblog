# FRIO Blog

FRIO blog postavený na **Next.js 15.2.2**. Zobrazuje články, umožňuje detail článku, komentáre, lajky, subkomentáre, prihlasovanie cez NextAuth a animácie s Framer Motion.

## Funkcie
- **Výpis článkov** s možnosťou stránkovania.
- **Detail článku** s textom a diskusiou.
- **Komentáre** (vrátane vnorenej diskusie/subkomentárov).
- **Lajkovanie** komentárov (aj subkomentárov).
- **Prihlasovanie** cez NextAuth (credentials).
- **Animácie** pri zobrazovaní článkov (Framer Motion).
- **Čistý kód** s ESLint + Prettier.

## Technológie
- Next.js 15.2.2
- Tailwind CSS
- NextAuth
- Framer Motion
- ESLint + Prettier

## Inštalácia a spustenie

```bash
git clone https://github.com/crookedr/frio-blog.git
cd frio-blog
npm install
npm run dev
