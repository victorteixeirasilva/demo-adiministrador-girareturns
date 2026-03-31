import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { DatasetElementType } from '@mui/x-charts/internals';
import { style } from 'motion/react-client';
import styles from "./Grafico.module.scss";
import { motion } from 'framer-motion';
import VerDetalhesGrafico from '../VerDetalhesGrafico/VerDetalhesGrafico';

const chartSetting = {
  xAxis: [
    {
      label: 'Valor (R$)',
    },
  ],
  height: 400,
  margin: { left: 0 },
};

type IStore = Record<string, string | number>;

export default function BalanceamentoDeItensPorLoja(
  {cor, dataset, valueFormatter}  :
  {
    cor?: string, 
    dataset: IStore[], 
    valueFormatter: (value: number | null) => string
  }
) {
    const [verDetalhesAberto, setVerDetalhesAberto] = useState(false);

    return (
      <>
        <div className={styles.grafico}>
            <BarChart
              dataset={dataset ?? []}
              yAxis={[{ 
                    scaleType: 'band', 
                    dataKey: 'cmp_name_to',
                    width: 200, 
                }]}
              series={[{ 
                    dataKey: 'total_qty', 
                    label: 'Balanceamento de Itens por Loja', 
                    valueFormatter,
                    color: cor ?? '#0C9144',
                    barLabel(item, context) {
                      const row = dataset[item.dataIndex];
                      return `${row.total_qty}`;
                    } 
                }]}
              layout="horizontal"
              {...chartSetting}
            />
            <div 
              className={styles.verDetalhes}
            >
              <motion.div className={styles.botao}
                whileHover={{ scale: 1.1}} 
                whileTap={{ scale: 0.95 }}
                onClick={() => setVerDetalhesAberto(true)}
              >
                <p>
                  Ver Detalhes
                </p>
              </motion.div>
            </div>
        </div>
        {verDetalhesAberto && (
          <>
            <VerDetalhesGrafico voltarFunc={() => setVerDetalhesAberto(false)}>
            <BarChart
              dataset={dataset ?? []}
              yAxis={[{ 
                    scaleType: 'band', 
                    dataKey: 'cmp_name_to',
                }]}
              series={[{ 
                    dataKey: 'total_qty', 
                    label: 'Balanceamento de Remessa por Loja', 
                    valueFormatter,
                    color: cor ?? '#0C9144', 
                }]}
              layout="horizontal"
              {...chartSetting}
            />
            </VerDetalhesGrafico>
          </>
        )}
      </>
      );
    
}
