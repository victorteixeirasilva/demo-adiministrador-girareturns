'use client'

import { useCallback, useEffect, useState } from "react";
import React from "react";
import styles from "./page.module.scss";
import { motion } from "motion/react";
import Menu from "@/components/Menu";
import Link from "next/link";
import { getPageTitleAndIcon } from "@/components/Menu/getPageTitle";
import BalanceamentoDeRemessaPorLojaGrafico from "@/components/Grafico/BalanceamentoDeRemessaPorLojaGrafico/BalanceamentoDeRemessaPorLojaGrafico";
import FiltroPorData from "@/components/FiltroPorData/FiltroPorData";
import dayjs, { Dayjs } from "dayjs";
import BalanceamentoDeItensPorLoja from "@/components/Grafico/BalanceamentoDeItensPorLoja/BalanceamentoDeItensPorLoja";
import { demoGetDashboard, demoGetPermissao } from "@/mock/demoApi";
import {formatarNumeroBrasileiro} from '../../variaveis'



export default function RemessaPage() {
    const [permissao, setPermissao] = useState(true);
    const [menuAberto, setMenuAberto] = useState(false);
    const [dataInicio, setDataInicio] = useState<Dayjs | null>(dayjs());
    const [dataFim, setDataFim] = useState<Dayjs | null>(dayjs());
    const [carregando, setCarregando] = useState(false);
    const [dadosRemessaPorLoja, setDadosRemessaPorLoja] = useState<any[]>([]);
    const [dadosItensPorLoja, setDadosItensPorLoja] = useState<any[]>([]);
    const [totalRemessa, setTotalRemessa] = useState(0);
    const [itensProcessados, setItensProcessados] = useState<number>(0);
    const [produtosUnicos, setProdutosUnicos] = useState<number>(0);
    const [path, setPath] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPath(localStorage.getItem('pathID'))
        }
    }, []); 

    function valueFormatterRS(value: number | null) {
        return `R$ ${formatarNumeroBrasileiro(value, 2)}`;
    }

    function valueFormatterQTD(value: number | null) {
        return `${formatarNumeroBrasileiro(value)} Unidades`;
    }

    const handleFiltrar = async (dataInicioFormatada: string, dataFimFormatada: string) => {
        setCarregando(true);

        try {
            const data = await demoGetDashboard(dataInicioFormatada, dataFimFormatada);
            setTotalRemessa(data.shipping.shipping_price_total);
            setItensProcessados(data.shipping.shipping_qty_total);
            setProdutosUnicos(data.shipping.shipping_qty_total_ean);
            setDadosRemessaPorLoja(data.shipping_store || []);
            setDadosItensPorLoja(data.shipping_store || []);

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
                                Total: R$ {formatarNumeroBrasileiro(totalRemessa, 2)}
                            </p>
                        </div>
                        <div className={styles.info}>
                            <p>
                                Itens Processados: {formatarNumeroBrasileiro(itensProcessados)}
                            </p>
                        </div>
                        <div className={styles.info}>
                            <p>
                                Produtos Únicos: {formatarNumeroBrasileiro(produtosUnicos)}
                            </p>
                        </div>
                    </div>
                    <div 
                        className={styles.line}
                        style={menuAberto ? {width: '90%', transition: '0.5s'}:{marginLeft: '50px', width: '95%', transition: '0.5s'}}
                    >
                        <BalanceamentoDeItensPorLoja cor="#003B87" dataset={dadosItensPorLoja} valueFormatter={valueFormatterQTD}/>
                        <BalanceamentoDeRemessaPorLojaGrafico dataset={dadosRemessaPorLoja} valueFormatter={valueFormatterRS}/>
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
