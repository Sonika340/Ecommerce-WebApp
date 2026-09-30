import { useContext } from "react";
import { AuthContext } from "../state-mangement/contextApi";


export const useAuth = ()=>{
    const user= useContext(AuthContext);
    if(!user){
        throw new Error("user is not available")
    }
    return user;
}