// components/VerDetalhesGrafico.tsx
import { BarChart } from '@mui/x-charts/BarChart';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from "./VerDetalhesGrafico.module.scss";

interface CardProps {
  children: ReactNode;
  voltarFunc: () => void;
}

export default function VerDetalhesGrafico({ children, voltarFunc }: CardProps) {
  return (
    <div className={styles.fundo}>
      <div className={styles.conteudo}>
        {children}
        <button onClick={voltarFunc}>X</button>
      </div>
    </div>
  );
}