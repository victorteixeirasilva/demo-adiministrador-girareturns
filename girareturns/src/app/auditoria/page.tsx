'use client'

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import styles from "./page.module.scss";
import { motion } from "motion/react";
import Menu from "@/components/Menu";
import { getPageTitleAndIcon } from "@/components/Menu/getPageTitle";
import dayjs, { Dayjs } from "dayjs";
import { ILineAuditoria } from "@/variaveis";
import {
  demoGetAuditoria,
  demoGetAuditoriaEan,
  demoGetAuditoriaUsuario,
  demoGetAuditoriaUsuarioEan,
  demoGetPermissao,
} from "@/mock/demoApi";
import {formatarNumeroBrasileiro} from '../../variaveis'
import FiltroPorDataAuditoria from "@/components/FiltroPorDataAuditoria/FiltroPorData";
import AuditoriaPopUp from "@/components/auditoriaPopUp";
import Image from "next/image";


export default function AuditoriaPage() {
    const [verNomeDoProduto, setVerNomeDoProduto] = useState(true);
    const [verPrecoDeVenda, setVerPrecoDeVenda] = useState(true);
    const [verPrecoBase, setVerPrecoBase] = useState(false);
    const [verDesconto, setVerDesconto] = useState(false);
    const [verMotivoPreco, setVerMotivoPreco] = useState(false);
    const [verDataEHora, setVerDataEHora] = useState(false);
    const [verCodigoEan, setVerCodigoEan] = useState(false);
    const [idOperador, setIdOperador] = useState<string>("");
    const [linhasAuditoria, setLinhasAuditoria] = useState<ILineAuditoria[]>();
    const [itemASerObservado, setItemASerObservado] = useState<ILineAuditoria>();

    const formatadorDeDataString = (dataString: string) => {
        const dataOriginal = dataString;

        // Criar objeto Date
        const data = new Date(dataOriginal);

        // Formatar usando Intl.DateTimeFormat
        const formatador = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // 24h
        });

        return formatador.format(data);
    }


    const irAoProximoTop = (opcaoPSubstituir:number) => {

        const numeroAleatorio = Math.floor(Math.random() * 7) + 1;
        
        if (numeroAleatorio !== opcaoPSubstituir) {
            if(numeroAleatorio === 1 && !verNomeDoProduto) {
                setVerNomeDoProduto(true);
                removerOpcaoAtiva(opcaoPSubstituir);
            } else if (numeroAleatorio === 2 && !verPrecoDeVenda) {
                setVerPrecoDeVenda(true);
                removerOpcaoAtiva(opcaoPSubstituir);
            } else if (numeroAleatorio === 3 && !verPrecoBase) {
                setVerPrecoBase(true);
                removerOpcaoAtiva(opcaoPSubstituir);
            } else if (numeroAleatorio === 4 && !verDesconto) {
                setVerDesconto(true);
                removerOpcaoAtiva(opcaoPSubstituir);
            } else if (numeroAleatorio === 5 && !verMotivoPreco) {
                setVerMotivoPreco(true);
                removerOpcaoAtiva(opcaoPSubstituir);
            } else if (numeroAleatorio === 6 && !verDataEHora) {
                setVerDataEHora(true);
                removerOpcaoAtiva(opcaoPSubstituir);
            } else if (numeroAleatorio === 7 && !verCodigoEan) {
                setVerCodigoEan(true);
                removerOpcaoAtiva(opcaoPSubstituir);
            }
        }

    };

    const removerOpcaoAtiva = (opcaoPSubstituir:number) => {
        if(opcaoPSubstituir === 1) {
                setVerNomeDoProduto(false);
            } else if (opcaoPSubstituir === 2) {
                setVerPrecoDeVenda(false);
            } else if (opcaoPSubstituir === 3) {
                setVerPrecoBase(false);
            } else if (opcaoPSubstituir === 4) {
                setVerDesconto(false);
            } else if (opcaoPSubstituir === 5) {
                setVerMotivoPreco(false);
            } else if (opcaoPSubstituir === 6) {
                setVerDataEHora(false);
            } else if (opcaoPSubstituir === 7) {
                setVerCodigoEan(false);
            }
    }

    const [verItem, setVerItem] = useState(false);

    const [permissao, setPermissao] = useState(true);
    const [menuAberto, setMenuAberto] = useState(false);
    const [dataInicio, setDataInicio] = useState<Dayjs | null>(dayjs());
    const [dataFim, setDataFim] = useState<Dayjs | null>(dayjs());
    const [carregando, setCarregando] = useState(false);
    const [path, setPath] = useState<string | null>(null);

    const [alerta, setAlerta] = useState<number>(20);
    
    const [gtinOrSku, setGtinOrSku] = useState<string>("");

    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPath(localStorage.getItem('pathID'))
        }
    }, []); 

    const handleFiltrar = async (dataInicioFormatada: string, dataFimFormatada: string) => {
        setCarregando(true);
        try {
            let data: ILineAuditoria[];
            if (idOperador !== "" && gtinOrSku === "") {
                data = await demoGetAuditoriaUsuario(dataInicioFormatada, dataFimFormatada, idOperador);
            } else if (gtinOrSku !== "" && idOperador === "") {
                data = await demoGetAuditoriaEan(dataInicioFormatada, dataFimFormatada, gtinOrSku);
            } else if (gtinOrSku !== "" && idOperador !== "") {
                data = await demoGetAuditoriaUsuarioEan(dataInicioFormatada, dataFimFormatada, idOperador, gtinOrSku);
            } else {
                data = await demoGetAuditoria(dataInicioFormatada, dataFimFormatada);
            }
            setLinhasAuditoria(data);
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
            {verItem && itemASerObservado && (
                <AuditoriaPopUp voltar={() => {setVerItem(false)}} item={itemASerObservado}/>
            )}
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
                    <FiltroPorDataAuditoria
                        dataInicio={dataInicio}
                        dataFim={dataFim}
                        onDataInicioChange={setDataInicio}
                        onDataFimChange={setDataFim}
                        onFiltrar={handleFiltrar}
                        carregando={carregando}
                        alertaPorcentagem={alerta}
                        setAlertaPorcentagem={setAlerta}
                        gtinOrSku={gtinOrSku}
                        setGtinOrSku={setGtinOrSku}
                        setIdOperador={setIdOperador}
                    />
                    <div 
                        className={styles.line}
                        style={menuAberto ? {width: '90%', transition: '0.5s'}:{marginLeft: '50px', width: '95%', transition: '0.5s'}}
                    >
                        <div
                            className={styles.containerTabela}
                        >
                            <div className={styles.topoTabela}>
                                <h3 
                                    style={isMobile && !verNomeDoProduto ? {
                                        display:"none"
                                    } : {}}
                                    onClick={() => {
                                        irAoProximoTop(1);
                                    }}
                                >
                                    {isMobile && (
                                        <Image 
                                            src="/IconeTouch.svg"
                                            alt="Icone Touch"
                                            width={20}
                                            height={20}
                                        />
                                    )}
                                    Nome do Produto

                                </h3>
                                <p
                                    style={isMobile ? {
                                        display:"none"
                                    } : {}}
                                />                        
                                <h3
                                    style={isMobile && !verPrecoDeVenda ? {
                                        display:"none"
                                    } : {}}
                                    onClick={() => {
                                        irAoProximoTop(2);
                                    }}
                                >
                                    {isMobile && (
                                        <Image 
                                            src="/IconeTouch.svg"
                                            alt="Icone Touch"
                                            width={20}
                                            height={20}
                                        />
                                    )}
                                    Preço de Venda
                                </h3>
                                <p
                                    style={isMobile ? {
                                        display:"none"
                                    } : {}}
                                />                        
                                <h3
                                    style={isMobile && !verPrecoBase ? {
                                        display:"none"
                                    } : {}}
                                    onClick={() => {
                                        irAoProximoTop(3);
                                    }}
                                >
                                    {isMobile && (
                                        <Image 
                                            src="/IconeTouch.svg"
                                            alt="Icone Touch"
                                            width={20}
                                            height={20}
                                        />
                                    )}
                                    Preço Base
                                </h3>
                                <p
                                    style={isMobile ? {
                                        display:"none"
                                    } : {}}
                                />                        
                                <h3
                                    style={isMobile && !verDesconto ? {
                                        display:"none"
                                    } : {}}
                                    onClick={() => {
                                        irAoProximoTop(4);
                                    }}
                                >
                                    {isMobile && (
                                        <Image 
                                            src="/IconeTouch.svg"
                                            alt="Icone Touch"
                                            width={20}
                                            height={20}
                                        />
                                    )}
                                    % Desconto
                                </h3>
                                <p
                                    style={isMobile ? {
                                        display:"none"
                                    } : {}}
                                />                        
                                <h3
                                    style={isMobile && !verMotivoPreco ? {
                                        display:"none"
                                    } : {}}
                                    onClick={() => {
                                        irAoProximoTop(5);
                                    }}
                                >
                                    {isMobile && (
                                        <Image 
                                            src="/IconeTouch.svg"
                                            alt="Icone Touch"
                                            width={20}
                                            height={20}
                                        />
                                    )}
                                    Motivo Preço
                                </h3>
                                <p
                                    style={isMobile ? {
                                        display:"none"
                                    } : {}}
                                />                        
                                <h3
                                    style={isMobile && !verDataEHora ? {
                                        display:"none"
                                    } : {}}
                                    onClick={() => {
                                        irAoProximoTop(6);
                                    }}
                                >
                                    {isMobile && (
                                        <Image 
                                            src="/IconeTouch.svg"
                                            alt="Icone Touch"
                                            width={20}
                                            height={20}
                                        />
                                    )}
                                    Data e Hora
                                </h3>
                                <p
                                    style={isMobile ? {
                                        display:"none"
                                    } : {}}
                                />                        
                                <h3
                                    style={isMobile && !verCodigoEan ? {
                                        display:"none"
                                    } : {}}
                                    onClick={() => {
                                        irAoProximoTop(7);
                                    }}
                                >
                                    {isMobile && (
                                        <Image 
                                            src="/IconeTouch.svg"
                                            alt="Icone Touch"
                                            width={20}
                                            height={20}
                                        />
                                    )}
                                    Código EAN
                                </h3>
                            </div>
                            {linhasAuditoria && linhasAuditoria?.map((line) => (
                                <div 
                                    className={styles.linhaTabela}
                                    style={{
                                        backgroundColor: 
                                            itemASerObservado?.id === line.id 
                                                ? '#0c9143a9' // Se for o item observado
                                                : line.new_discount_percentage >= alerta 
                                                    ? '#ffd900a0' // Else if: se atingiu o alerta
                                                    : '#FFFFFF'   // Else: cor padrão
                                    }}
                                    onClick={() => {
                                        setVerItem(true);
                                        setItemASerObservado(line);
                                    }}
                                    key={line.id}
                                >
                                    <h3
                                        style={isMobile && !verNomeDoProduto ? {
                                            display:"none"
                                        } : {}}
                                    >
                                        {line.product_name}
                                    </h3>
                                    <p
                                        style={isMobile ? {
                                            display:"none"
                                        } : {}}
                                    />                        
                                    <h3
                                        style={isMobile && !verPrecoDeVenda ? {
                                            display:"none"
                                        } : {}}
                                    >
                                        R$ {formatarNumeroBrasileiro(line.new_price, 2)}
                                    </h3>
                                    <p
                                        style={isMobile ? {
                                            display:"none"
                                        } : {}}
                                    />                        
                                    <h3
                                        style={isMobile && !verPrecoBase ? {
                                            display:"none"
                                        } : {}}
                                    >
                                        R$ {formatarNumeroBrasileiro(line.new_price_base, 2)}
                                    </h3>
                                    <p
                                        style={isMobile ? {
                                            display:"none"
                                        } : {}}
                                    />                        
                                    <h3
                                        style={isMobile && !verDesconto ? {
                                            display:"none"
                                        } : {}}
                                    >
                                        {formatarNumeroBrasileiro(line.new_discount_percentage, 2)}%
                                    </h3>
                                    <p
                                        style={isMobile ? {
                                            display:"none"
                                        } : {}}
                                    />                        
                                    <h3
                                        style={isMobile && !verMotivoPreco ? {
                                            display:"none"
                                        } : {}}
                                    >
                                        {
                                            line.price_reason === 0 ? "CADASTRO DE PRODUTO" : 
                                            line.price_reason === 1 ? "PREÇO PROMOCIONAL" :
                                            line.price_reason === 2 ? "ATUALIZAÇÃO DE VIGÊNCIA":
                                            line.price_reason === 3 ? "AUMENTO DE PREÇO":
                                            line.price_reason === 4 ? "REDUÇÃO DE PREÇO":
                                            line.price_reason === 5 ? "CORREÇÃO DE ERRO":
                                            line.price_reason === 6 ? "DADOS CADASTRAIS": "DESCONHECIDA"
                                        }
                                    </h3>
                                    <p
                                        style={isMobile ? {
                                            display:"none"
                                        } : {}}
                                    />                        
                                    <h3
                                        style={isMobile && !verDataEHora ? {
                                            display:"none"
                                        } : {}}
                                    >
                                        {formatadorDeDataString(line.created_at)}
                                    </h3>
                                    <p
                                        style={isMobile ? {
                                            display:"none"
                                        } : {}}
                                    />                        
                                    <h3
                                        style={isMobile && !verCodigoEan ? {
                                            display:"none"
                                        } : {}}
                                    >
                                        {line.product_ean}
                                    </h3>
                                </div>
                            ))}
                        </div>
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
