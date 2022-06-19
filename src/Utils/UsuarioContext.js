import { createContext, useContext, useState } from "react";

export const UsuarioContext = createContext()

export const UsuarioProvider = ({children}) => {
    const [usuario, setUsuario] = useState({})
    const addUsuario = pessoa =>{
        setUsuario(antigo => ({
            ...antigo,
            [pessoa.id]:pessoa
        }))
    }
    return(
        <UsuarioContext.Provider value={{usuario,addUsuario }}>
            {children}
        </UsuarioContext.Provider>
    )
}
export const useUsuario = () => {
    const usuario = useContext(UsuarioContext)
    return usuario
}