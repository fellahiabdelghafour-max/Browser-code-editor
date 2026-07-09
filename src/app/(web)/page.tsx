'use client'
import { Editor } from "@monaco-editor/react";
import { Box, Button, Card, Typography, useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import { useThemeModeContext } from "../../../context/Theme&Toast";
import DemoFiles from './../../../DemoFiles.json';
import { useState } from "react";
export default function Home() {
  const {mode}=useThemeModeContext();
  const [selected,setSelected]=useState('app.js');
  const theme = useTheme();
      const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}    >
        <Typography  component="h1" sx={{color:'text.primary',fontSize:{sm:'15px',md:'30px'}}}>
          Welcome to Convex + Next.js!
        </Typography>
        <Typography  component="h1" sx={{color:'text.primary',fontSize:{sm:'10px',md:'25px'}}}>
          Browser Code Editor
        </Typography>
        <Link href={'/workSpace'}>
        <Button variant="contained" color="primary">
          Get Started
        </Button>   

        </Link>
        <Box sx={{width:'100vw',minHeight:'900px',display:'flex',justifyContent:"center",alignItems:'center',position:'relative',perspective:1500,ml:{sm:'',md:70}}}>
        {
          DemoFiles.map((file,index)=>
            <Box key={index}
            onClick={()=>setSelected(file.name)}
          sx={{
            position:'absolute',
            transformStyle:"preserve-3d",
            boxShadow:
            file.name===selected
            ?
            `0 30px 70px ${mode==='light'?'rgba(0,0,0,.45)':'rgba(255, 255, 255, 0.45)'}`
            :
            `0 10px 25px ${mode==='light'?'rgba(0,0,0,.2)':'rgba(255, 255, 255, 0.2)'}`,          
            transform:
            file.name === selected
            ?
            `
            translate(-20%,70%)
            scale(1.05)
            rotate(0deg)
            `
            :
            `
            translate(-80%, -70%)
            translate(${index*45}px,${index*18}px)
            rotate(${-(index-2)*4}deg)
            `,
            transition: "all .35s ease",
            zIndex:file.name===selected?1:'',
                  "&:hover":{
                  cursor:"pointer",
                  transform:file.name===selected
                  ?undefined
                  :`
                  translate(-50%,-53%)
                  translate(${index*35}px,${index*15}px)
                  rotate(${-(index-2)*4}deg)
                  `,
                  },
            }}>
            <Card 
               sx={{
                 width:'100%',
                 background:'black',
                 display:'flex',
                 justifyContent:'flex-start',
                 alignItems:'center',
                 gap:'20px',
                 filter:file.name===selected
                            ?""
                            :"brightness(.8)",
               }}>
                <Typography
                  sx={{color:'white',pl:1}}
                  >
                  {file.name}
                </Typography>
                <Typography
                  sx={{
                    color:file.type==='html'
                          ?'#f97316':
                          file.type==='css'
                          ?'#55f7ef'
                          :file.type==='js'
                          ?'#c3d406'
                          :'#9e9e9e'
                  }}>
                   {(file.type).toUpperCase()}
                </Typography>
            </Card>
         <Editor
                             
                              height={file.name===selected?(isMobile?200:400):(isMobile?150:300)}
                              width={file.name===selected?(isMobile?200:600):(isMobile?150:500)}
                              theme={mode === 'dark' ? "vs-dark" : 'light'}
                              value={file.Content}
                              language={'html'
                              }
                              options={{
                                  fontSize: 14,
                                  fontFamily: "'Fira Code', monospace", // ← font احترافي
                                  fontLigatures: true,
                                  minimap: { enabled: false },          // ← يوفر مساحة
                                  scrollbar: { verticalScrollbarSize: 6 },
                                  lineNumbers: 'on',
                                  wordWrap: 'on',
                                  padding: { top: 12 },
                                  smoothScrolling: true,
                                  cursorSmoothCaretAnimation: 'on',
                                  renderLineHighlight: 'line',
                              }}
                          />
            </Box>
          )
        }          
        </Box>


    </Box>
  );
}
