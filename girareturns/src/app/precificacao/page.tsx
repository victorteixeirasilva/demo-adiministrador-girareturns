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
import MotivosDePrecificacao from "@/components/Grafico/MotivosDePrecificacao/MotivosDePrecificacao";
import PrecificacaoPorCanalDeBusca from "@/components/Grafico/PrecificacaoPorCanalDeBusca/PrecificacaoPorCanalDeBusca";
import ComparativoDescontoAplicadoXPadrao from "@/components/Grafico/ComparativoDescontoAplicadoXPadrao/ComparativoDescontoAplicadoXPadrao";
import ProdutividadeDePrecificacaoPorHora from "@/components/Grafico/ProdutividadeDePrecificacaoPorHora/ProdutividadeDePrecificacaoPorHora";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { demoGetDashboard, demoGetPermissao } from "@/mock/demoApi";
import {formatarNumeroBrasileiro} from '../../variaveis'

interface IPrecificacaoResumo {
    pricing_qty_total: number,
    pricing_average_price: number,
    pricing_average_discount: number,
    pricing_total_discount: number,
    pricing_qty_user: number,
    pricing_first_log: string,
    pricing_qty_no_discount: number,
    pricing_qty_negative_discount: number,
    pricing_qty_equal_default_discount: number,
    pricing_qty_above_default_discount: number,
    pricing_qty_below_default_discount: number
}

export default function PrecificacaoPage() {
    const [permissao, setPermissao] = useState(true);
    const [menuAberto, setMenuAberto] = useState(false);
    const [dataInicio, setDataInicio] = useState<Dayjs | null>(dayjs());
    const [dataFim, setDataFim] = useState<Dayjs | null>(dayjs());
    const [carregando, setCarregando] = useState(false);
    const [canais, setCanais] = useState<any[]>([]); // Array vazio inicial (removi comentários para clean)
    const [produtividadePorHora, setProdutividadePorHora] = useState<any[]>([]);
    const [rasoes, setRasoes] = useState<any[]>([]);
    const [compartaivo, setComparativo] = useState<any>([]);
    const [precificacaoResumo, setPrecificacaoResumo] = useState<IPrecificacaoResumo>(); // Movido para topo
    const [path, setPath] = useState<string | null>(null)
    
    const converterPricingParaLista = (pricingObj: any) => {
        return [
            {
                "name": "SEM DESCONTO",
                "qty": pricingObj.pricing_qty_no_discount
            },
            {
                "name": "COM ACRÉSCIMO",
                "qty": pricingObj.pricing_qty_negative_discount
            },
            {
                "name": "DESCONTO = 20%",
                "qty": pricingObj.pricing_qty_equal_default_discount
            },
            {
                "name": "DESCONTO > 20%",
                "qty": pricingObj.pricing_qty_above_default_discount
            },
            {
                "name": "DESCONTO < 20%",
                "qty": pricingObj.pricing_qty_below_default_discount
            }
        ];
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPath(localStorage.getItem('pathID'))
        }
    }, []); 

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

    function formatarData(dataISO: string): string {
        return format(parseISO(dataISO), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
    }

    function valueFormatterCANAIS(value: number | null) {
        return `${formatarNumeroBrasileiro(value)} Vezes`;
    }

    function valueFormatterQTD(value: number | null) {
        return `${formatarNumeroBrasileiro(value)} Vezes`;
    }

    const handleFiltrar = async (dataInicioFormatada: string, dataFimFormatada: string) => {
        setCarregando(true);

        try {
            const data = await demoGetDashboard(dataInicioFormatada, dataFimFormatada);
            const precificacaoResumoData = data.pricing;
            setPrecificacaoResumo(precificacaoResumoData);

            // const canaisData = data.pricing_channel;
            setCanais(data.pricing_channel || []); // Fallback para array vazio
            setProdutividadePorHora(data.productivity_per_hour || [])
            setRasoes(data.reason || [])
            // console.log(converterPricingParaLista(data.pricing))
            setComparativo(converterPricingParaLista(data.pricing) || [])

            // Opcional: Atualize outros states se a API retornar (ex: produtividadePorHora = data.prodPorHora || [...])

        } catch (err) {
            console.error('Erro ao buscar dados:', err);
            alert('Erro ao carregar dados. Tente novamente.');
        } finally {
            setCarregando(false);
        }
    };

    if (permissao) {
        return (
            <>
                <Menu aberto={menuAberto} setAberto={setMenuAberto} />
                <motion.div 
                    className={styles.page}
                    style={menuAberto ? { marginLeft: '200px', transition: '0.5s' } : { width: "100%", transition: '0.5s' }}
                >
                    <div className={styles.conteudo}
                        style={menuAberto ? { width: '100%', transition: '0.5s' } : { width: '100%', transition: '0.5s' }}
                    >
                        <div 
                            className={styles.topo}
                            style={menuAberto ? { transition: '0.5s' } : { marginLeft: '100px', transition: '0.5s' }}
                        >
                            <h1>{getPageTitleAndIcon()}</h1>
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
                                <p>Quantidade de Precificações: {precificacaoResumo && formatarNumeroBrasileiro(precificacaoResumo.pricing_qty_total.toFixed(0))}</p>
                            </div>
                            <div className={styles.info}>
                                <p>Preço Médio: R$ {precificacaoResumo && formatarNumeroBrasileiro(precificacaoResumo.pricing_average_price, 2)}</p>
                            </div>
                            <div className={styles.info}>
                                <p>Desconto Médio: {precificacaoResumo && formatarNumeroBrasileiro(precificacaoResumo.pricing_average_discount)}%</p>
                            </div>
                        </div>
                        <div className={styles.resumos}>
                            <div className={styles.info}>
                                <p>Quantidade de Operadores: {precificacaoResumo && formatarNumeroBrasileiro(precificacaoResumo.pricing_qty_user)}</p>
                            </div>
                            <div className={styles.info}>
                                <p>1 Precificação do Período: {precificacaoResumo && precificacaoResumo.pricing_first_log && formatarData(precificacaoResumo.pricing_first_log)}</p>
                            </div>
                        </div>
                        <div 
                            className={styles.line}
                            style={menuAberto ? { width: '90%', transition: '0.5s' } : { marginLeft: '50px', width: '95%', transition: '0.5s' }}
                        >
                            <ProdutividadeDePrecificacaoPorHora dataset={produtividadePorHora} valueFormatter={valueFormatterQTD} />
                            <ComparativoDescontoAplicadoXPadrao cor="#1e9600c3" dataset={compartaivo} valueFormatter={valueFormatterQTD} />
                        </div>
                        <div className={styles.line}
                            style={menuAberto ? { width: '90%', transition: '0.5s' } : { marginLeft: '50px', width: '95%', transition: '0.5s' }}
                        >
                            <MotivosDePrecificacao cor="#1e9600c3" dataset={rasoes} valueFormatter={valueFormatterQTD} />
                            <PrecificacaoPorCanalDeBusca dataset={canais} valueFormatter={valueFormatterCANAIS} />
                        </div>
                        <div 
                            className={styles.topo}
                            style={menuAberto ? { marginTop: '50px', transition: '0.5s' } : { marginTop: '50px', marginLeft: '100px', transition: '0.5s' }}
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