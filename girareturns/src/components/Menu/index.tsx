import React, { useCallback, useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import Image from "next/image";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import getPageTitle, { getPageTitleAndIcon } from "./getPageTitle";

export default function Menu({aberto, setAberto}: {aberto: boolean, setAberto: (aberto: boolean) => void}) {

    const router = useRouter();

    function getEmailUsername(email: string | null | undefined): string {
        if (!email || typeof email !== 'string' || email.trim() === '') {
            return '';
        }

        const atIndex = email.indexOf('@');

        if (atIndex > 0) {
            return email.substring(0, atIndex);
        } 

        else if (atIndex === -1) {
            return email; 
        }

        else {
            return ''; 
        }
    }

    const [linkLogo, setLinkLogo] = useState<string | null>(null);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setAuthToken(localStorage.getItem('token'));
            setLinkLogo(localStorage.getItem('linkLogo'));
            setUser(localStorage.getItem('user'));
        }
    }, []); 

    return (
        <>
            <motion.div
                className={aberto ? styles.menu : styles.menuFechado}
            >
                <div style={{marginTop: '10px'}}>
                    <div 
                        className={styles.botao}
                        onClick={() => {setAberto(!aberto)}}
                    >
                        <Image 
                            src="/IconeMenorQue.svg"
                            alt="Icone Fechar Menu"
                            width={16}
                            height={16}
                        />
                        <p>
                            Fechar Menu
                        </p>
                    </div>
                    <div 
                        className={styles.botao}
                        onClick={() => {
                            router.push('/remessa');
                        }}
                        style={getPageTitle() === "Remessa" ? {backgroundColor: '#0C9144'} : {}}
                    >
                        <Image 
                            src="/IconeRemessa.svg"
                            alt="Icone Remessa"
                            width={16}
                            height={16}
                        />
                        <p>
                            Remessa
                        </p>
                    </div>
                    <div 
                        className={styles.botao}
                        onClick={() => {
                            router.push('/precificacao');
                        }}
                        style={getPageTitle() === "Precificação" ? {backgroundColor: '#0C9144'} : {}}
                    >
                        <Image 
                            src="/IconPrecificacao.svg"
                            alt="Icone Precificação"
                            width={16}
                            height={16}
                        />
                        <p>
                            Precificação
                        </p>
                    </div>
                    <div 
                        className={styles.botao}
                        onClick={() => {
                            router.push('/produtividade');
                        }}
                        style={getPageTitle() === "Produtividade" ? {backgroundColor: '#0C9144'} : {}}
                    >
                        <Image 
                            src="/IconeProdutividade.svg"
                            alt="Icone Produtividade"
                            width={16}
                            height={16}
                        />
                        <p>
                            Produtividade
                        </p>
                    </div>
                    <div 
                        className={styles.botao}
                        onClick={() => {
                            router.push('/auditoria');
                        }}
                        style={getPageTitle() === "Auditoria" ? {backgroundColor: '#0C9144'} : {}}
                    >
                        <Image 
                            src="/IconeAuditoria.svg"
                            alt="Icone Auditoria"
                            width={23}
                            height={23}
                            style={{marginLeft: '-3px'}}
                        />
                        <p>
                            Auditoria
                        </p>
                    </div>
                </div>
                <div>
                    <div 
                        className={styles.botao}
                    >
                        <img className={styles.logoEmpresa} src={linkLogo || "/girae-logo.png"} alt=""/>
                    </div>
                    <div 
                        className={styles.botao}
                    >
                        <Image 
                            src="/iconsUser.png"
                            alt="Icone Configuração"
                            width={18}
                            height={18}
                        />
                        <p>
                            {getEmailUsername(user)}
                        </p>
                    </div>
                    <div 
                        className={styles.botaoDesconectar}
                        onClick={
                            () => {
                                localStorage.removeItem('token');
                                const path = localStorage.getItem('pathID');
                                router.push('/login')
                            }
                        }
                    >
                        <Image 
                            src="/IconeDesconectar.svg"
                            alt="Icone Desconectar"
                            width={16}
                            height={16}
                        />
                        <p>
                            Desconectar
                        </p>
                    </div>
                </div>
            </motion.div>
            <div className={styles.menuMobile}>
                <Image 
                    src="/IconeMenuMobile.svg"
                    alt="Icone Abrir Menu"
                    width={26}
                    height={26}
                    onClick={() => {setAberto(!aberto)}}
                />
                <h1>
                    {
                        getPageTitle()
                    }
                </h1>
            </div>
        </>
    );
}