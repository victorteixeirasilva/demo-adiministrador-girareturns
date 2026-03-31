import React, { useCallback, useEffect, useState } from "react";
import styles from "./CardLogin.module.scss";
import Image from "next/image";
import { motion } from "motion/react";
import { LINK_SUPORTE_DEMO } from "@/variaveis";
import { demoGetLogo, demoPostLogin } from "@/mock/demoApi";
import { ClipLoader } from 'react-spinners';
import { useRouter } from "next/navigation";


export default function CardLogin({path} : {path: string}) {
    const [logoUrl, setLogoUrl] = useState("");

    const [carregando, setCarregando] = useState(false);
    const [popLoginInvalido, setPopLoginInvalido] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const getLogo = useCallback(async () => {
        const data = await demoGetLogo(email);
        setLogoUrl(data.logoUrl);
    }, [email]);

    useEffect(() => {
        getLogo();
    }, [getLogo]);

    const login = async () => {
        setCarregando(true);
        const result = await demoPostLogin({
            email,
            password,
            pathProject: path,
        });

        if (result.ok) {
            localStorage.setItem('token', result.bearerToken);
            localStorage.setItem('pathID', path);
            localStorage.setItem('user', email);
            const logo = await demoGetLogo(email);
            setLogoUrl(logo.logoUrl);
            localStorage.setItem('linkLogo', logo.logoUrl || '');
            setCarregando(false);
            router.push("/remessa");
        } else if (result.status === 401) {
            setPopLoginInvalido(true);
            setPassword('');
            setCarregando(false);
        }
    }

    return (
        <>
        {!popLoginInvalido && (            
            <motion.div 
                className={styles.cardLogin} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}  
            >
                <Image className={styles.logo} src={logoUrl === "" ? "/girae-logo.png" : logoUrl } alt="Project Logo" width={200} height={200}/>
                <h1>Login</h1>
                <div className={styles.protectData}>
                    <h2>
                        Preencha com seus dados
                    </h2>
                    <Image 
                        src="/IconeProteDados.svg" 
                        alt="Icone de proteção de dados"
                        width={16}
                        height={16}
                    />
                </div>
                <div className={styles.inputFields}>
                    <div className={styles.input}>
                        <Image 
                            src="/UserInputIcon.svg" 
                            alt="Icone de User"
                            width={16}
                            height={16}
                        />
                        <input type="text" placeholder="Usuário" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className={styles.input}>
                        <Image 
                            src="/UserSenhaIcon.svg" 
                            alt="Icone de User"
                            width={16}
                            height={16}
                        />
                        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className={styles.space}></div>
                    <motion.a
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.8 }}
                        href={LINK_SUPORTE_DEMO}
                        target="_blank"
                    >
                        Precisa de ajuda? Falar com suporte
                    </motion.a>
                </div>
                <motion.div 
                    className={styles.loginButton}
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.8 }}
                    onClick={login}
                >
                    {carregando && <ClipLoader size={10} color="#ffffff" />}
                    <span 
                        style={{ 
                            marginLeft: carregando ? '8px' : '0'
                        }}
                    ></span>
                    Entrar
                </motion.div>
            </motion.div>
        )}
        {popLoginInvalido && (
            <motion.div 
                className={styles.cardLogin} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}  
            >
                <h1>
                    Login inválido. Tente novamente. 
                </h1>
                <motion.div 
                    className={styles.loginButton}
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setPopLoginInvalido(false)}
                >
                    {carregando && <ClipLoader size={10} color="#ffffff" />}
                    <span 
                        style={{ 
                            marginLeft: carregando ? '8px' : '0'
                        }}
                    ></span>
                    Voltar
                </motion.div>
            </motion.div>
        )}
        </>
    );
}

interface ILogoResponse {
    logoUrl: string;
}

export function PopUpPath() {

    const [path, setPath] = useState("");
    const router = useRouter();


    return (
            <motion.div 
                className={styles.cardLogin} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}  
            >
                <h2>
                    Informe o Path da Empresa! 
                </h2>
                <div className={styles.inputFields}>
                    <div className={styles.input}>
                        <Image 
                            src="/UserInputIcon.svg" 
                            alt="Icone de User"
                            width={16}
                            height={16}
                        />
                        <input type="text" placeholder="Path" value={path} onChange={(e) => setPath(e.target.value)}/>
                    </div>
                    <motion.div
                        onClick={() => {
                            router.replace("/login/?id="+path)
                        }}
                        className={styles.loginButton}
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.8 }}
                    >
                        Entrar
                    </motion.div>
                </div>
            </motion.div>
    );
}