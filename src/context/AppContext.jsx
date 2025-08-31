import React, { useEffect, useState } from 'react'
import { createContext,useContext } from 'react'

const AppContext = createContext()



//Funcion para crear el contexto con las distintas variables que se usarán del backend
export function AppProvider({children}){
    const [user,setUser] = useState(null)
    const [pizzas,setPizzas] = useState([])

    const [cart,setCart] = useState([])

    useEffect(()=>{
        fetch('http://localhost:5000/me',{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.loggedIn) {
                setUser(data.user)
            }
        })
        .catch(err=>{console.log(err);
        })
    },[])

    return (
        <AppContext.Provider value={{user,setUser,pizzas,setPizzas,cart,setCart}}>
            {children}
        </AppContext.Provider>
    )
}

//Hook para usar el contexto en cualquier parte
export function useAppContext(){
    return useContext(AppContext)
}














