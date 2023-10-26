import { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider=({childern})=>{
    const [state,setstate]=useState([]);
    return(
        <UserContext.Provider value={{state,setstate}}>{childern}</UserContext.Provider>
    )


}



export default UserContextProvider;