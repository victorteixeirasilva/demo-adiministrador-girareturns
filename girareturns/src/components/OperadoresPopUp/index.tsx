import { useCallback, useEffect, useState } from "react";
import styles from "./Operadores.module.scss";
import { demoGetUsuariosAtivos } from "@/mock/demoApi";

export interface IUsuario {
    user_id: string,
    user_name: string,
    user_type: number,
    user_status: string,
    cmp_id: number,
    user_key: string,
    user_group_id: string,
    user_code: number
}

export default function OperadoresPopUp({voltar, setOperador}:{voltar?:any, setOperador:(valor: string) => void}) {

    const [operadores, setOperadores] = useState<IUsuario[] | undefined>();

    const pegarOperadores = useCallback(async () => {
        try {
            const data = await demoGetUsuariosAtivos();
            setOperadores(data);
        } catch (err) {
            console.error('Erro ao carregar operadores (demo):', err);
        }
    }, []);

    useEffect(() => {
        pegarOperadores();
        setOperador("");
    }, [pegarOperadores]);


return (
  <div
    className={styles.overlay}
    onClick={voltar}
  >
    <div
      className={styles.card}
      onClick={(e) => e.stopPropagation()}
    >
        <div
            className={styles.opcao}
            onClick={() => {
                setOperador("");
                voltar();
            }}
        >
          <h2
            onClick={() => {
                setOperador("");
                voltar()
            }}
          >Todos Os Operadores</h2>
        </div>
      {operadores?.map((o) => (
        <div
            className={styles.opcao}
            key={o.user_id}
            onClick={() => {
                setOperador(o.user_id);
                voltar()
            }}
        >
          <h2
            onClick={() => {
                setOperador(o.user_id);
                voltar()
            }}
          >{o.user_name}</h2>
        </div>
      ))}
    </div>
  </div>
);
}