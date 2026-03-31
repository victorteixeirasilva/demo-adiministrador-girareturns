import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { DatasetElementType } from '@mui/x-charts/internals';
import { p, style } from 'motion/react-client';
import styles from "./Grafico.module.scss";
import { motion } from 'framer-motion';
import VerDetalhesGrafico from '../VerDetalhesGrafico/VerDetalhesGrafico';
import { formatarNumeroBrasileiro } from '@/variaveis';

const chartSetting = {
  xAxis: [
    {
      label: 'Repetições do Motivo',
    },
  ],
  height: 400,
  // height: Math.max(400, data?.length * 50),  // ← Cresce com dados
  // margin: { left: 180 }
  
};

type IStore = Record<string, string | number>;

export default function MotivosDePrecificacao(
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
              dataset={dataset}
              yAxis={[{ 
                    scaleType: 'band', 
                    dataKey: 'price_reason_name',
                    width: 200, 
                }]}
              series={[{ 
                    dataKey: 'price_reason_qty_total', 
                    label: 'Motivos de Precificação', 
                    valueFormatter,
                    color: cor ?? '#0C9144', 
                    barLabel(item, context) {
                      const row = dataset[item.dataIndex];
                      return `${formatarNumeroBrasileiro(row.price_reason_qty_total)}`;
                    },
                    minBarSize: 20,
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
              dataset={dataset}
              yAxis={[{ 
                    scaleType: 'band', 
                    dataKey: 'price_reason_name',
                    width: 200, 
                }]}
              series={[{ 
                    dataKey: 'price_reason_qty_total', 
                    label: 'Motivos de Precificação', 
                    valueFormatter,
                    color: cor ?? '#0C9144',
                    barLabel(item, context) {
                      const row = dataset[item.dataIndex];
                      return `${formatarNumeroBrasileiro(row.price_reason_qty_total)}`;
                    },
                    minBarSize: 30, 
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
