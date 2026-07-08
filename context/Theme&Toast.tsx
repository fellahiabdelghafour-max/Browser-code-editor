'use client'
import { useContext,createContext, ReactNode, useEffect, useState } from "react";
import useThemeMode from "../hook/ThemeMode/useThemeMode";
import useToast from "../hook/Toast/useToast";

interface ThemeModeProps{
    mode:'light'|'dark';
    setMode:(mode:'light'|'dark')=>void;
    ChangeMode:()=>void
  toast?: {
    message: string;
    type: "success" | "error" | "info";
  } | null;
  setToast?: (toast:{
    message: string;
    type: "success" | "error" | "info";
  } | null)=>void;
  handleToast?: (message: string, type: "success" | "error" | "info") => void;
  open:boolean;
  setOpen:(open:boolean)=>void;
  openDrawer:boolean;
  setOpenDrawer:(openDrawer:boolean)=>void
}

const ThemeModeContext= createContext<ThemeModeProps|null>(null);

export default function ThemeModeProvider({children}:{children:ReactNode}){   
    const {mode,setMode}=useThemeMode();
    const [openDrawer,setOpenDrawer]=useState(false);
    const { toast, setToast, handleToast,open,setOpen }=useToast();
        function ChangeMode(){
          setMode(mode === 'light' ? 'dark' : 'light');
        }
    useEffect(()=>{
        localStorage.setItem('Mode',mode)
    },[mode])

     return(<ThemeModeContext.Provider value={{
        mode,
        setMode,
        ChangeMode,
        toast,
        setToast,
        handleToast,
        open,
        setOpen,
        openDrawer,
        setOpenDrawer,
    }}>
                 {children}
     </ThemeModeContext.Provider>)

}

export const useThemeModeContext = () => {
  const context = useContext(ThemeModeContext);
  if (!context) throw new Error('useThemeModeContext must be used inside ThemeModeProvider');
  return context;  
};