import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import styles from "./Grafico.module.scss";

type IStore = {
  username: string;
  name: string;
  qtde_precificados: number;
  valor_precificados: number;
  rank_number: number;
  color: string;
};

const chartSetting = {
  xAxis: [
    {
      label: 'Produtividade De Precificação De Produtos',
    },
  ],
  height: 600,
  margin: { left: 0 },
};

export default function ProdutividadeDePrecificacaoDeProdutos(
  { dataset, valueFormatter }: {
    dataset: IStore[],
    valueFormatter: (value: number | null) => string
  }
) {


  return (
    <div className={styles.grafico}>
      <BarChart
        dataset={dataset}
        yAxis={[{
          scaleType: 'band',
          dataKey: 'name',
          width: 0,
        }]}
        series={[{
          dataKey: 'qtde_precificados',
          label: 'Operadores',
          valueFormatter,
          color: '#0C9144',
          barLabel(item, context) {
            const row = dataset[item.dataIndex];
            return `${row.name}`;
          },
          minBarSize: 50,
          colorGetter: (item) => {
            const row = dataset[item.dataIndex];
            return row?.color ?? '#0C9144';
          },
        }]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  );
}

