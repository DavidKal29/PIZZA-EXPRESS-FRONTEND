import React, { useState } from 'react'
import { createContext,useContext } from 'react'

const AppContext = createContext()

//Funcion para crear el contexto con las distintas variables que se usarán del backend
export function AppProvider({children}){
    const [user,setUser] = useState(null)
    const [pizzas,setPizzas] = useState([])

    return (
        <AppContext.Provider value={{user,setUser,pizzas,setPizzas}}>
            {children}
        </AppContext.Provider>
    )
}

//Hook para usar el contexto en cualquier parte
export function useAppContext(){
    return useContext(AppContext)
}














