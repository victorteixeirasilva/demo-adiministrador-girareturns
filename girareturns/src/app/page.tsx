import Image from "next/image";
import styles from "./page.module.scss";
import SVGComponent from "@/components/PaginaDeVendas/Vendas";
import LandingPage from "@/components/PaginaDeVendas";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LandingPage />
      </main>
    </div>
  );
}
