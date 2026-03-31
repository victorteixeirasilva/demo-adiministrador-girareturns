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
}

export default function FiltroPorData({
  dataInicio,
  dataFim,
  onDataInicioChange,
  onDataFimChange,
  onFiltrar,
  carregando = false,
}: FiltroPorDataProps) {
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
          </div>

          {erro && <div className={styles.erro}>{erro}</div>}

          <button
            className={styles.botaoFiltrar}
            onClick={handleFiltrar}
            disabled={carregando}
          >
            {carregando ? 'Filtrando...' : 'Filtrar'}
          </button>
        </div>
      </LocalizationProvider>
    </ThemeProvider>

  );
}