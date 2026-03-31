import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { DatasetElementType } from '@mui/x-charts/internals';
import { style } from 'motion/react-client';
import styles from "./Grafico.module.scss";
import { motion } from 'framer-motion';
import VerDetalhesGrafico from '../VerDetalhesGrafico/VerDetalhesGrafico';
import { formatarNumeroBrasileiro } from '@/variaveis';

const chartSetting = {
  xAxis: [
    {
      label: 'Quantidade de Vezes que o Desconto Foi Aplicado',
    },
  ],
  height: 400,
  margin: { left: 0 },
};

type IStore = Record<string, string | number>;

export default function ComparativoDescontoAplicadoXPadrao(
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
                    dataKey: 'name',
                    width: 150, 
                }]}
              series={[{ 
                    dataKey: 'qty', 
                    label: 'Quantidade de Vezes que o Desconto Foi Aplicado', 
                    valueFormatter,
                    color: cor ?? '#0C9144', 
                    barLabel(item, context) {
                      const row = dataset[item.dataIndex];
                      return `${formatarNumeroBrasileiro(row.qty)}`;
                    },
                    minBarSize: 100,
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
                    dataKey: 'name',
                    width: 150,
                }]}
              series={[{ 
                    dataKey: 'qty', 
                    label: 'Quantidade de Vezes que o Desconto Foi Aplicado', 
                    valueFormatter,
                    color: cor ?? '#0C9144',
                    barLabel(item, context) {
                      const row = dataset[item.dataIndex];
                      return `${formatarNumeroBrasileiro(row.qty)}`;
                    },
                    minBarSize: 100  
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
