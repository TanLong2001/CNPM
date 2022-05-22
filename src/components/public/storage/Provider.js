import { Children } from "react";
import Context from "./Context";

export default function Provider({dataProp,children}){
    return(
        <Context.Provider value={dataProp}>
            {children}
        </Context.Provider>
    )
}