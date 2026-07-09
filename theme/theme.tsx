'use client'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";
import { useThemeModeContext } from "../context/Theme&Toast";
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    secondary: string;  
  }
}

export default function AppThemeProvider({ children }: { children: ReactNode }) {
    
       const {mode}=useThemeModeContext();
    const theme=createTheme({
       
        palette:{
            
            mode,
            background:{
                default:mode==='dark'?'#06080f':'#f4f0ff',
                paper:mode==='dark'?'#000119':'#fff',
                secondary:mode==='dark'?'#0b1121':'#ffffff'
            }

            ,
            success:{
                main:mode==='dark'?'#1a3511':'#bcf1ae'
            },
            error:{
                main:mode==='dark'?'#351111':'#fab1b1'
            },
            info:{
                main:mode==='dark'?'#353511':'#f5f5a9'
            },
        
           text:{
            primary:mode==='dark'?'#f7f7f7':'#000000',
            secondary:'#d7d7d7',
               disabled:'#6b6464c2'},
           primary:{
            main:mode==='dark'?'#f7f7f7':'#000000'
           },
           secondary:{
            main:'#070d1a'
           },
        },
        components:{
            MuiButton:{
                styleOverrides:{
                    root:{
                        textTransform:'none',  
                        minHeight:'40px', 
                        backgroundImage:'linear-gradient(to right, #3b82f6 30%, #7c3aed 90%)',
                        borderRadius:"10px",
                        
                    }
                }
            },
            MuiIconButton:{
                styleOverrides:{
                    root:{
                        backgroundImage:'linear-gradient(to bottom, #3b82f6 30%, #7c3aed 90%)',
                        width:'50px',
                        height:'50px',
                        borderRadius:'10px',

                    }
                }
            },
           MuiOutlinedInput:{
            styleOverrides:{
                root:{
                    borderRadius:'20px',
                    background:mode==='dark'?'#111e35':'#f0eaf199',
                    border:'1px solid ',
                    borderColor:'rgba(99,102,241,0.18) ',
                    color:mode==='dark'?'#f7f7f7':'#000000',

                }
            }
           },
           MuiTypography:{
            styleOverrides:{
                root:{
                    color:mode==='dark'?'#f7f7f7':'#000000',
                }
            }
           },
          
        }
    })

    return(
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )

}