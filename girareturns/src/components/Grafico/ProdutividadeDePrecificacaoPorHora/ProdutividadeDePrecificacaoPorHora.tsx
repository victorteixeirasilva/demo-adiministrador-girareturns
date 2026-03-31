import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { DatasetElementType } from '@mui/x-charts/internals';
import { style } from 'motion/react-client';
import styles from "./Grafico.module.scss";
import { motion } from 'framer-motion';
import VerDetalhesGrafico from '../VerDetalhesGrafico/VerDetalhesGrafico';

const chartSetting = {
  yAxis: [
    {
      label: 'Quantidade de Precificações',
    },
  ],
  height: 400,
  margin: { left: 0 },
};

type IStore = Record<string, string | number>;

export default function ProdutividadeDePrecificacaoPorHora(
  {cor, dataset, valueFormatter}  :
  {
    cor?: string, 
    dataset: IStore[], 
    valueFormatter: (value: number | null) => string
  }
) {
    // const [data, setData] = useState<IStore[]>([]);
    const [verDetalhesAberto, setVerDetalhesAberto] = useState(false);

    // useEffect(() => {
    //     setData(dataset);
    // }, []);

    return (
      <>
        <div className={styles.grafico}>
            <BarChart
              dataset={dataset ?? []}
              xAxis={[{ 
                    scaleType: 'band', 
                    dataKey: 'hour',
                }]}
              series={[{ 
                    dataKey: 'total', 
                    label: 'Produtividade de Precificação Por Hora', 
                    valueFormatter,
                    color: cor ?? '#0C9144',
                }]}
              layout="vertical"
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
              xAxis={[{ 
                    scaleType: 'band', 
                    dataKey: 'hour' 
                }]}
              series={[{ 
                    dataKey: 'total', 
                    label: 'Precificação Por Canal de Busca', 
                    valueFormatter,
                    color: cor ?? '#0C9144',
                    barLabel(item, context) {
                      const row = dataset[item.dataIndex];
                      return `${row.total}`;
                    },
                    minBarSize: 50 
                }]}
              layout="vertical"
              {...chartSetting}
            />
            </VerDetalhesGrafico>
          </>
        )}
      </>
      );
    
}