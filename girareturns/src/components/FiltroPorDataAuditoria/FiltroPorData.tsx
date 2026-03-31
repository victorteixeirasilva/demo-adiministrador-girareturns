// components/FiltroPorData.tsx
'use client';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import styles from "./FiltroPorData.module.scss";
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Image from 'next/image';
import OperadoresPopUp from '../OperadoresPopUp';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0C9144',
    },
  },
});

dayjs.locale('pt-br');

interface FiltroPorDataProps {
  dataInicio: Dayjs | null;
  dataFim: Dayjs | null;
  onDataInicioChange: (data: Dayjs | null) => void;
  onDataFimChange: (data: Dayjs | null) => void;
  onFiltrar: (dataInicio: string, dataFim: string) => void;
  carregando?: boolean;
  alertaPorcentagem: number | null;
  setAlertaPorcentagem: (porcentagem: number) => void; 
  gtinOrSku: string | null;
  setGtinOrSku: (codigo: string) => void;
  setIdOperador: (valor: string) => void;
}

export default function FiltroPorDataAuditoria({
  dataInicio,
  dataFim,
  onDataInicioChange,
  onDataFimChange,
  onFiltrar,
  carregando = false,
  alertaPorcentagem,
  setAlertaPorcentagem,
  gtinOrSku,
  setGtinOrSku,
  setIdOperador
}: FiltroPorDataProps) {
  const [abrirOperadores, setAbrirOperadores] = useState(false);
  const [erro, setErro] = useState<string>('');

  const handleFiltrar = () => {
    setErro('');

    // Validações
    if (!dataInicio || !dataFim) {
      setErro('Selecione ambas as datas');
      return;
    }

    if (dataInicio.isAfter(dataFim)) {
      setErro('Data de início não pode ser depois da data de fim');
      return;
    }

    // Se passou nas validações, chama a função do pai
    onFiltrar(
      dataInicio.format('YYYY-MM-DD'),
      dataFim.format('YYYY-MM-DD')
    );
  };

  return (
    <>
    {abrirOperadores && (
      <OperadoresPopUp voltar={() => setAbrirOperadores(false)} setOperador={setIdOperador}/>
    )}
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <div className={styles.container}>
          <div className={styles.datas}>
            <div className={styles.data}>
              <p>Início</p>
              <MobileDatePicker
                value={dataInicio}
                onChange={(newValue) => {
                  onDataInicioChange(newValue);
                  setErro('');
                }}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    error: !!erro,
                  },
                }}
              />
            </div>

            <div className={styles.data}>
              <p>Fim</p>
              <MobileDatePicker
                value={dataFim}
                onChange={(newValue) => {
                  onDataFimChange(newValue);
                  setErro('');
                }}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    error: !!erro,
                  },
                }}
              />
            </div>
            <div 
              className={styles.operador}
              onClick={() => {
                setAbrirOperadores(true);
                setIdOperador("");
              }}
            >
              <p>Operador(a)</p>
              <Image 
                  src="/IconeOperador.svg"
                  alt="Icone Operador"
                  width={26}
                  height={26}
              />
            </div>
          </div>
          <div className={styles.datas}>
            <div className={styles.operador}>
              <p>Alerta % Desconto</p>
              <input 
                className={styles.input} 
                type="number" 
                placeholder={"%"}
                value={alertaPorcentagem ?? 20}
                onChange={(e) => {setAlertaPorcentagem(Number(e.target.value))}}
              />
              <Image 
                  src="/IconeAlertaDesconto.svg"
                  alt="Icone Alerta % Desconto"
                  width={26}
                  height={26}
              />
            </div>

            <div className={styles.operador}>
              <p>GTIN/SKU</p>
              <input 
                className={styles.input} 
                type="text" 
                placeholder="código"
                value={gtinOrSku || ""}
                onChange={(e) => {setGtinOrSku(e.target.value)}}
              />
              <Image 
                  src="/IconeGTIN.svg"
                  alt="Icone GTIN ou SKU"
                  width={26}
                  height={26}
              />
            </div>

            <button
              className={styles.botaoFiltrar}
              onClick={handleFiltrar}
              disabled={carregando}
            >
              {carregando ? 'Filtrando...' : 'Filtrar'}
            </button>
          </div>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
    </>
  );
}