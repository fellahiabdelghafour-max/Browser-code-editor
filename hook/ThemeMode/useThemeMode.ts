import { useEffect, useState } from "react";
export default function useThemeMode(){
const [mode, setMode] = useState<'light' | 'dark'>('dark');

useEffect(() => {
  const localMode = localStorage.getItem("mode") as "light" | "dark" | null;

  if (localMode) {
    setMode(localMode);
  }
}, []);
    useEffect(()=>{
        localStorage.setItem('mode',mode);
    },[mode]);
    return{mode,setMode}
}