export default function AboutPage() {
  return (
    <div className="space-y-8">
      {/* O Nás */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md p-8">
        <h2 className="text-2xl font-bold mb-4">O FRIO Blogu</h2>
        <p className="leading-relaxed">
          FRIO Blog je miesto, kde nájdeš najnovšie informácie, novinky a
          zaujímavosti. Tím našich autorov sa snaží prinášať kvalitný obsah,
          ktorý ťa inšpiruje a zabaví.
        </p>
      </div>

      {/* Náš tím (3 boxy) */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Náš tím</h3>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Roman 1 */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md p-8 flex-1 transition duration-300 hover:scale-105 hover:shadow-lg">
            <h4 className="text-lg font-semibold mb-2">Roman 1</h4>
            <p className="leading-relaxed">
              Roman 1 je náš senior front-end vývojár s viac než 5-ročnými
              skúsenosťami v Reacte a Next.js. Zameriava sa na výkonné a
              prístupné používateľské rozhrania, ktoré vyzerajú moderne a
              fungujú spoľahlivo. Vo FRIO Blogu sa stará najmä o architektúru
              front-end kódu, aby bol dobre udržiavateľný a rýchly.
            </p>
            <p className="leading-relaxed mt-2">
              Vo voľnom čase rád hrá stolové hry, bicykluje a experimentuje s
              novými JavaScriptovými knižnicami. Ak máš otázky k Reactu, Roman 1
              je tá správna osoba, na ktorú sa obrátiť.
            </p>
          </div>

          {/* Roman 2 */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md p-8 flex-1 transition duration-300 hover:scale-105 hover:shadow-lg">
            <h4 className="text-lg font-semibold mb-2">Roman 2</h4>
            <p className="leading-relaxed">
              Roman 2 je hlavný blogger FRIO Blogu, ktorý zodpovedá za tvorbu,
              úpravu a plánovanie všetkých článkov. Jeho cieľom je prinášať
              čitateľom zaujímavé témy, inšpiratívne príbehy a kvalitné
              informácie z rôznych oblastí. Venuje sa nielen písaniu vlastných
              príspevkov, ale aj koordinácii ďalších autorov, aby náš blog
              zostal čerstvý a aktuálny.
            </p>
            <p className="leading-relaxed mt-2">
              Vo FRIO Blogu pôsobí ako „strážca štýlu“, vďaka čomu si všetky
              články zachovávajú jednotný tón a kvalitu. Mimo práce rád číta
              knihy o histórii a cestovaní, čo mu dáva množstvo podnetov na nové
              blogové témy. Ak si všimneš pútavý článok, pravdepodobne za ním
              stojí Roman 2.
            </p>
          </div>

          {/* Roman 3 */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md p-8 flex-1 transition duration-300 hover:scale-105 hover:shadow-lg">
            <h4 className="text-lg font-semibold mb-2">Roman 3</h4>
            <p className="leading-relaxed">
              Roman 3 je náš junior front-end developer, ktorý nadšene objavuje
              svet Reactu a Next.js. Vo FRIO Blogu pomáha vylepšovať
              používateľské rozhranie a priebežne sa učí nové techniky a
              knižnice, aby sa neustále posúval vpred.
            </p>
            <p className="leading-relaxed mt-2">
              Aj keď je ešte na začiatku kariéry, už teraz preukazuje veľkú
              zanietenosť pre detail a čistý kód. Jeho cieľom je stať sa rovnako
              skúseným vývojárom, ako jeho kolegovia, a prispieť k rozvoju blogu
              inovatívnymi nápadmi. Vo voľnom čase sleduje vývojárske
              konferencie, skúša nové tutoriály a s radosťou napreduje vo svete
              front-endu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
