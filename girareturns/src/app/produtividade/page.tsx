'use client'

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import styles from "./page.module.scss";
import { motion } from "motion/react";
import Menu from "@/components/Menu";
import { getPageTitleAndIcon } from "@/components/Menu/getPageTitle";
import FiltroPorData from "@/components/FiltroPorData/FiltroPorData";
import dayjs, { Dayjs } from "dayjs";
import ProdutividadeDePrecificacaoDeProdutos from "@/components/Grafico/ProdutividadeDePrecificacaoDeProdutos/ProdutividadeDePrecificacaoPorHora";
import { demoGetDashboard, demoGetDashboardProdutividade, demoGetPermissao } from "@/mock/demoApi";
import {formatarNumeroBrasileiro} from '../../variaveis'



export default function ProdutividadePage() {
    const [permissao, setPermissao] = useState(true);
    const [menuAberto, setMenuAberto] = useState(false);
    const [dataInicio, setDataInicio] = useState<Dayjs | null>(dayjs());
    const [dataFim, setDataFim] = useState<Dayjs | null>(dayjs());
    const [carregando, setCarregando] = useState(false);
    const [qtdDeBuscaDePrecos, setQtdDeBuscaDePrecos] = useState<number>(0);
    const [tempoMedioBusca, setTempoMedioBusca] = useState<number>(0);
    const [totOperacoes, setTotOperacoes] = useState<number>(0);
    const [totOperadores, setTotOperadores] = useState<number>(0);
    const [mediaOperador, setMediaOperador] = useState<number>(0);
    const [produtividadePorOperador, setProdutividadePorOperador] = useState<any[]>([]);    
    const [path, setPath] = useState<string | null>(null);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPath(localStorage.getItem('pathID'))
        }
    }, []); 

    

    function valueFormatterVezes(value: number | null) {
        return `${formatarNumeroBrasileiro(value)} Vezes`;
    }

    const handleFiltrar = async (dataInicioFormatada: string, dataFimFormatada: string) => {
        setCarregando(true);

        try {
            const data = await demoGetDashboard(dataInicioFormatada, dataFimFormatada);
            setQtdDeBuscaDePrecos(data.log.search_qty_total);
            setTempoMedioBusca(data.log.search_avg_time);

            const data2 = await demoGetDashboardProdutividade(dataInicioFormatada, dataFimFormatada);
            setProdutividadePorOperador(data2);

        } catch (err) {
            console.error('Erro ao buscar dados:', err);
            alert('Erro ao carregar dados. Tente novamente.');
        } finally {
            setCarregando(false);
        }
    };

    const verificarPermissao = useCallback(async () => {
        try {
            const ok = await demoGetPermissao();
            setPermissao(ok);
        } catch (err) {
            console.error('Erro ao verificar permissão:', err);
            setPermissao(false);
        }
    }, []);

    useEffect(() => {
        verificarPermissao();
        if(dataInicio && dataFim){
            handleFiltrar(
                dataInicio.format('YYYY-MM-DD'),
                dataFim.format('YYYY-MM-DD')
            )
        }
    }, [verificarPermissao]);

    if (permissao) {    
        return (
            <>
            <Menu aberto={menuAberto} setAberto={setMenuAberto}/>
            <motion.div 
                className={styles.page}
                style={menuAberto ? {marginLeft: '200px', transition: '0.5s'}:{width: "100%", transition: '0.5s'}}
            >
                <div className={styles.conteudo}
                        style={menuAberto ? {width: '100%', transition: '0.5s'}:{width: '100%', transition: '0.5s'}}
                >
                    <div 
                        className={styles.topo}
                        style={menuAberto ? {transition: '0.5s'} : {marginLeft: '100px', transition: '0.5s'} }
                    >
                        <h1>
                            {getPageTitleAndIcon()}
                        </h1>
                    </div>
                    <FiltroPorData
                        dataInicio={dataInicio}
                        dataFim={dataFim}
                        onDataInicioChange={setDataInicio}
                        onDataFimChange={setDataFim}
                        onFiltrar={handleFiltrar}
                        carregando={carregando}
                    />
                    <div className={styles.resumos}>
                        <div className={styles.info}>
                            <p>
                                Busca de Preços: {formatarNumeroBrasileiro(qtdDeBuscaDePrecos)}
                            </p>
                        </div>
                        <div className={styles.info}>
                            <p>
                                Tempo médio por busca: {formatarNumeroBrasileiro(tempoMedioBusca)}s
                            </p>
                        </div>
                    </div>
                    <div className={styles.resumos}>
                        {/* <div className={styles.info}>
                            <p>
                                Total de Operações: {totOperacoes.toFixed(0)}
                            </p>
                        </div> */}
                        {/* <div className={styles.info}>
                            <p>
                                Tempo médio por busca: {tempoMedioBusca}s
                            </p>
                        </div> */}
                        {/* <div className={styles.info}>
                            <p>
                                Total de Operadores: {totOperadores}
                            </p>
                        </div>
                        <div className={styles.info}>
                            <p>
                                Média por Operador: {mediaOperador}
                            </p>
                        </div> */}
                    </div>
                    <div 
                        className={styles.line}
                        style={menuAberto ? {width: '90%', transition: '0.5s'}:{marginLeft: '50px', width: '95%', transition: '0.5s'}}
                    >
                        <ProdutividadeDePrecificacaoDeProdutos dataset={produtividadePorOperador} valueFormatter={valueFormatterVezes}/>
                    </div>
                    <div className={styles.line}
                        style={menuAberto ? {width: '90%', transition: '0.5s'}:{marginLeft: '50px', width: '95%', transition: '0.5s'}}
                    >
                    </div>
                    <div 
                        className={styles.topo}
                        style={menuAberto ? {marginTop: '50px', transition: '0.5s'} : {marginTop: '50px', marginLeft: '100px', transition: '0.5s'} }
                    >
                    </div>
                </div>
            </motion.div>
            </>
        );
    } else {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f8f9fa', // Fundo cinza claro suave
                flexDirection: 'column',
                padding: '20px',
                boxSizing: 'border-box'
            }}>
                <h1 style={{
                color: '#dc3545', // Vermelho Bootstrap para alertas
                fontSize: '2.5rem',
                fontWeight: '600',
                textAlign: 'center',
                margin: '0 0 1rem 0',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra sutil para profundidade
                fontFamily: 'system-ui, -apple-system, sans-serif' // Fonte nativa para compatibilidade
                }}>
                Sem permissão para ver essa tela
                </h1>
                <p style={{
                color: '#6c757d', // Cinza médio para texto secundário
                fontSize: '1.1rem',
                textAlign: 'center',
                margin: '0',
                lineHeight: '1.5',
                maxWidth: '400px'
                }}>
                Você não possui acesso a esta seção. Entre em contato com o administrador do sistema para solicitar permissões, caso tenha permição, apenas faça o login novamente!.
                </p>
                <Link href={path ? `/login?id=${encodeURIComponent(path)}` : "/login"}>Voltar ao login da demo</Link>
            </div>
        );
    }

}
