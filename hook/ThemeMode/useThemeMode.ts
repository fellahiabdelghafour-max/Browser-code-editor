import { useEffect, useState } from "react";
export default function useThemeMode(){
    
const LocalMode=localStorage.getItem('mode') as 'light'|'dark'|null;
    const [mode,setMode]=useState<'light'|'dark'>(LocalMode || 'dark');
    useEffect(()=>{
        localStorage.setItem('mode',mode);
    },[mode]);
    return{mode,setMode}
}