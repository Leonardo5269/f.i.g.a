import type { CSSProperties, ReactNode } from "react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Sticker } from "@/components/Sticker";
import { Tshirt } from "@/components/Tshirt";
import { Hoodie } from "@/components/Hoodie";
import { Cap } from "@/components/Cap";
import { Scarf } from "@/components/Scarf";
import { Barcode } from "@/components/Barcode";

const GRAFICHE: Record<string, ReactNode> = {
  adesivo: <Sticker />,
  maglietta: <Tshirt />,
  felpa: <Hoodie />,
  cappellino: <Cap />,
  sciarpa: <Scarf />,
};

export default function HomePage() {
  return (
    <>
      <header className="testata">
        <p>Facciamo Italia Grande Ancora</p>
        <p className="testata-atto">Catalogo ufficiale · dal 2026</p>
      </header>

      <main className="pagina">
        <section className="hero" aria-labelledby="titolo-brand">
          <div className="grafica marchio-vetrina">
            <Sticker />
          </div>

          <h1 id="titolo-brand" className="hero-titolo">
            Il Merchandising Ufficiale.
          </h1>

          <p className="hero-lead">
            Cinque pezzi, un solo marchio, la stessa faccia tosta di sempre.
            Nessuna gerarchia tra un adesivo e una felpa: scegli il tuo, un
            click e sei in cassa.
          </p>
        </section>

        <section className="prodotti" aria-labelledby="titolo-collezione">
          <h2 id="titolo-collezione" className="prodotti-titolo">
            La Collezione.
          </h2>

          <div className="prodotti-griglia">
            {PRODUCTS.map((product, index) => (
              <div
                key={product.id}
                className="prodotto-stagger"
                style={{ "--i": index } as CSSProperties}
              >
                <ProductCard product={product} graphic={GRAFICHE[product.id]} />
              </div>
            ))}
          </div>
        </section>

        <section className="dettagli" aria-label="Il manifesto del marchio">
          <div className="dettagli-griglia">
            <div className="valori">
              <h2 className="valori-titolo">Il Manifesto Ufficiale</h2>
              <p className="valori-sub">valori dichiarati, non certificati</p>
              <table>
                <tbody>
                  <tr>
                    <th scope="row">Sfacciataggine</th>
                    <td>98%</td>
                  </tr>
                  <tr>
                    <th scope="row">Ironia patriottica</th>
                    <td>91%</td>
                  </tr>
                  <tr>
                    <th scope="row">Serietà del progetto</th>
                    <td>100%</td>
                  </tr>
                  <tr>
                    <th scope="row">Taglie sbagliate</th>
                    <td>0%</td>
                  </tr>
                  <tr>
                    <th scope="row">Rimpianti</th>
                    <td>0%</td>
                  </tr>
                </tbody>
              </table>
              <p className="valori-footnote">
                Valori dichiarati dalla sede centrale, che coincide con il
                salotto di casa.
              </p>
            </div>

            <div className="specifiche">
              <dl>
                <div>
                  <dt>Prodotti in gamma</dt>
                  <dd>5</dd>
                </div>
                <div>
                  <dt>Fondata</dt>
                  <dd>2026</dd>
                </div>
                <div>
                  <dt>Sede</dt>
                  <dd>Italia</dd>
                </div>
                <div>
                  <dt>Restituzioni</dt>
                  <dd>Su richiesta</dd>
                </div>
              </dl>
              <p className="specifiche-resistenza">
                Resiste all&rsquo;acqua, al sole, alla lavastoviglie e ai
                giudizi.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="fondo">
        <div className="fondo-griglia">
          <Barcode />
          <div className="fondo-note">
            <p>
              f.i.g.a.® sta per Facciamo Italia Grande Ancora. Non è un
              programma politico, è una felpa.
            </p>
            <p>© 2026 f.i.g.a. · Tutti i diritti riservati, compresi quelli inutili.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
