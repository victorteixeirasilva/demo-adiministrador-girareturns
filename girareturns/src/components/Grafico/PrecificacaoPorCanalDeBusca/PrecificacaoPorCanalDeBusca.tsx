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
      label: 'Quantidade de Precificações',
    },
  ],
  height: 400,
  margin: { left: 0 },
};

type IStore = Record<string, string | number>;

export default function PrecificacaoPorCanalDeBusca(
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

    // useEffect(() => {
    //   // Validação opcional: Só set se for array válido
    //   if (Array.isArray(dataset)) {
    //     setData(dataset);
    //     console.log('Dataset atualizado no gráfico:', dataset); // Debug temporário
    //   } else {
    //     setData([]); // Fallback para array vazio se inválido
    //   }
    // }, [dataset]); // Dependência: Roda toda vez que 'dataset' (canais do pai) mudar



    return (
      <>
        <div className={styles.grafico}>
            <BarChart
              dataset={dataset}
              yAxis={[{ 
                    scaleType: 'band', 
                    dataKey: 'data_channel',
                    width: 200, 
                }]}
              series={[{ 
                    dataKey: 'pricing_qty_total', 
                    label: 'Precificação Por Canal de Busca', 
                    valueFormatter,
                    color: cor ?? '#0C9144', 
                    barLabel(item, context) {
                      const row = dataset[item.dataIndex];
                      return `${row.pricing_qty_total}`;
                    },
                    minBarSize: 50,
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
                    dataKey: 'data_channel',
                    width: 200,
                }]}
              series={[{ 
                    dataKey: 'pricing_qty_total', 
                    label: 'Precificação Por Canal de Busca', 
                    valueFormatter,
                    color: cor ?? '#0C9144', 
                    barLabel(item, context) {
                      const row = dataset[item.dataIndex];
                      return `${row.pricing_qty_total}`;
                    },
                    minBarSize: 50,
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
