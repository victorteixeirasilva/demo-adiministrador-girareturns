import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react'
import styles from './Menu.module.scss'

export default function getPageTitle() {

    const pathname = usePathname();
    const isActivePrecificacao = pathname === '/precificacao' || pathname === '/precificacao/';
    const isActiveProdutividade = pathname === '/produtividade' || pathname === '/produtividade/';
    const isActiveConfiguracao = pathname === '/configuracao' || pathname === '/configuracao/';
    const isActiveRemessa = pathname === '/remessa' || pathname === '/remessa/';
    const isActiveAuditoria = pathname === '/auditoria' || pathname === '/auditoria/';


    if (isActivePrecificacao) {
        return 'Precificação';
    } else if (isActiveProdutividade) {
        return 'Produtividade';
    } else if (isActiveConfiguracao) {
        return 'Configuração';
    } else if (isActiveRemessa) {
        return 'Remessa';
    } else if (isActiveAuditoria){
        return 'Auditoria';
    } else {
        return '';
    }
}

export function getPageTitleAndIcon() {

    const pathname = usePathname();
    const isActivePrecificacao = pathname === '/precificacao' || pathname === '/precificacao/';
    const isActiveProdutividade = pathname === '/produtividade' || pathname === '/produtividade/';
    const isActiveConfiguracao = pathname === '/configuracao' || pathname === '/configuracao/';
    const isActiveRemessa = pathname === '/remessa' || pathname === '/remessa/';
    const isActiveAuditoria = pathname === '/auditoria' || pathname === '/auditoria/';

    if (isActivePrecificacao) {
        return (<>
                    <Image 
                        src="/IconPrecificacao.svg"
                        alt="Icone Precificação"
                        width={26}
                        height={26}
                        className={styles.svgPreto}
                    />  
                    Precificação
                </>);
    } else if (isActiveProdutividade) {
        return (<>
                    <Image 
                        src="/IconeProdutividade.svg"
                        alt="Icone Produtividade"
                        width={26}
                        height={26}
                        className={styles.svgPreto}
                    />  
                    Produtividade
                </>);
    } else if (isActiveConfiguracao) {
        return (<>
                    <Image 
                        src="/IconPrecificacao.svg"
                        alt="Icone Precificação"
                        width={26}
                        height={26}
                        className={styles.svgPreto}
                    />  
                    Configuração
                </>);
    } else if (isActiveRemessa) {
        return (<>
                    <Image 
                        src="/IconeRemessa.svg"
                        alt="Icone Remessa"
                        width={26}
                        height={26}
                        className={styles.svgPreto}
                    />  
                    Remessa
                </>);
    } else if (isActiveAuditoria) {
        return (<>
            <Image 
                src="/IconeAuditoria.svg"
                alt="Icone Auditoria"
                width={26}
                height={26}
                className={styles.svgPreto}
            />  
            Auditoria
        </>);
    } else {
        return '';
    }
}