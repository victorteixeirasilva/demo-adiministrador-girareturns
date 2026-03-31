import Image from "next/image";
import styles from "./AuditoriaPopUp.module.scss";
import { useEffect, useState } from "react";
import { formatarNumeroBrasileiro, ILineAuditoria } from "@/variaveis";


export default function AuditoriaPopUp({voltar, item}:{voltar?:any, item: ILineAuditoria}) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const largura = window.innerWidth;
        setIsMobile(largura <= 1024);
    }, []);

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

    const isValidUrl = (value?: string | null) => {
        if (!value) return false;

        try {
            const url = new URL(value);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
            return false;
        }
    };

    return (
        <div 
            className={styles.overlay}
            onClick={voltar}
        >
            <div className={styles.card}>
                <p 
                    onClick={voltar}
                    style={{cursor: "pointer"}}
                >
                    X
                </p>
                <div className={styles.conteudo}>
                    <h1>
                        Dados da Precificação Selecionada
                    </h1>
                    <div className={styles.nomeProduto}>
                        <h2>
                            {item.product_name}
                            <div className={styles.cardImagemProduto}>
                                <img src={isValidUrl(item.product_image_content) ? item.product_image_content : "/produtoSemFoto.png"} alt=""/>
                            </div>
                        </h2>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.cardInfo}>
                            <div className={styles.titulo}>
                                <h3>
                                    Código EAN / Referência
                                </h3>
                            </div>
                            <div className={styles.conteudoCard}>
                                <h3>
                                    {item.product_ean}
                                </h3>
                            </div>
                        </div>
                        <div className={styles.cardInfo}>
                            <div className={styles.titulo}>
                                <h3>
                                    Palavra-Chave
                                </h3>
                            </div>
                            <div className={styles.conteudoCard}>
                                <h3>
                                    ...
                                </h3>
                            </div>
                        </div>
                        <div className={styles.cardInfo}>
                            <div className={styles.titulo}>
                                <h3>
                                    Preço de Venda
                                </h3>
                            </div>
                            <div className={styles.conteudoCard}>
                                <h3>
                                    R$ {formatarNumeroBrasileiro(item.new_price, 2)}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.cardInfo}>
                            <div className={styles.titulo}>
                                <h3>
                                    Preço Anterior
                                </h3>
                            </div>
                            <div className={styles.conteudoCard}>
                                <h3>
                                    R$ {formatarNumeroBrasileiro(item.base_price_retail_offline, 2)}
                                </h3>
                            </div>
                        </div>
                        <div className={styles.cardInfo}>
                            <div className={styles.titulo}>
                                <h3>
                                    Data/Hora da Operação
                                </h3>
                            </div>
                            <div className={styles.conteudoCard}>
                                <h3>
                                    {formatadorDeDataString(item.created_at)}
                                </h3>
                            </div>
                        </div>
                        <div className={styles.cardInfo}>
                            <div className={styles.titulo}>
                                <h3>
                                    Operador
                                </h3>
                            </div>
                            <div className={styles.conteudoCard}>
                                <h3>
                                    {item.user_name}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.cardInfo}>
                            <div className={styles.titulo}>
                                <h3>
                                    Cadastro Novo?
                                </h3>
                            </div>
                            <div className={styles.conteudoCard}>
                                <h3>
                                    {item.price_reason === 0 ? "SIM" : "NÃO"}
                                </h3>
                            </div>
                        </div>
                        <div className={styles.cardInfo}>
                            <div className={styles.titulo}>
                                <h3>
                                    Cadastro Realizado?
                                </h3>
                            </div>
                            <div className={styles.conteudoCard}>
                                <h3>
                                    {item.register_erp ? "SIM" : "NÃO"}
                                </h3>
                            </div>
                        </div>
                        <div className={styles.cardInfo}>
                            <div className={styles.titulo}>
                                <h3>
                                    Origem do Preço Base
                                </h3>
                            </div>
                            <div className={styles.conteudoCard}>
                                <h3>
                                    {item.data_channel}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.line}>
                        <div className={styles.cardInfo}>
                            <div className={styles.titulo}>
                                <h3>
                                    Preço Base Utilizado
                                </h3>
                            </div>
                            <div className={styles.conteudoCard}>
                                <h3>
                                    R$ {formatarNumeroBrasileiro(item.new_price_base, 2)}
                                </h3>
                            </div>
                        </div>
                        <div className={styles.cardInfo}>
                            <div className={styles.titulo}>
                                <h3>
                                    % Desconto Aplicado
                                </h3>
                            </div>
                            <div className={styles.conteudoCard}>
                                <h3>
                                    {formatarNumeroBrasileiro(item.new_discount_percentage, 2)}%
                                </h3>
                            </div>
                        </div>
                        <div className={styles.cardInfo}>
                            <div className={styles.titulo}>
                                <h3>
                                    Custo Estimado
                                </h3>
                            </div>
                            <div className={styles.conteudoCard}>
                                <h3>
                                    {formatarNumeroBrasileiro(item.new_cost_percentage, 2)}%
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.line}
                    >
                        <div className={styles.cardInfo}
                            // style={{marginBottom: "100px"}}
                        >
                            <div className={styles.titulo}>
                                <h3>
                                    Custo Estimado
                                </h3>
                            </div>
                            <div className={styles.conteudoCard}>
                                <h3>
                                    R$ {formatarNumeroBrasileiro(item.new_cost_estimated, 2)}
                                </h3>
                            </div>
                        </div>
                        <div className={styles.cardInfo}
                            // style={{marginBottom: "100px"}}
                        >
                            <div className={styles.titulo}>
                                <h3>
                                    Marketplace de Origem
                                </h3>
                            </div>
                            <div className={styles.conteudoCard}>
                                <h3>
                                    {item.data_seller}
                                </h3>
                            </div>
                        </div>
                        <div className={styles.cardInfo}
                            onClick={() => window.open(item.base_price_url, '_blank')}
                            style={{cursor: 'pointer'}}
                        >
                            <div className={styles.titulo} style={{padding: "0px"}}>
                                <Image
                                    src="/IconeAbrirLink.svg"
                                    alt="Icone Abrir Link"
                                    width={34}
                                    height={34}
                                    style={isMobile ? {marginLeft: '0%'} : {marginLeft: "45%"}}
                                />
                            </div>
                            <div 
                                className={styles.conteudoCard}
                            >
                                <h3 style={{color: "#0C9144"}}>
                                    Abrir URL
                                </h3>
                            </div>
                        </div>
                    </div>
                    <p 
                        onClick={voltar}
                        style={{cursor: "pointer", marginBottom: "20px", fontWeight: "700"}}
                    >
                        Voltar
                    </p>
                </div>
            </div>
        </div>
    );
}