'use client'
import { Box, Button, Card, IconButton, Stack, Typography } from "@mui/material"
import useRedirectSign from "../../../../hook/redirectSignPage/useRedirectSign";
import CodeSharpIcon from '@mui/icons-material/CodeSharp';
import SignUpPage from "../../../../components/sign_up/SignUp";
import LoginPage from "../../../../components/login/Login";

export default function AuthPage() {
    const{message,SignUp,Signin,sign}=useRedirectSign();
  return (
          <Box
          sx={{
            display:'flex',
            flexDirection:"column",
            alignItems:'center',
            gap:'10px',


           }}>
            
            <Stack direction={'row'} spacing={2}
              sx={{
                display:'flex',
                alignItems:'center'
              }}>
                <IconButton
                 >
                   <CodeSharpIcon/>
                 </IconButton>
               <Stack>
                   <Typography
                      sx={{
                        fontSize:'30px',
                        fontWeight:500,
                        color:"text.primary"
                      }}>
                        CodeBlue
                   </Typography>
                   <Typography 
                     color='textDisabled'
>
                        Browser IDE
                   </Typography>
               </Stack>
            </Stack>
             <Typography
              sx={{
                width:'200px',
                color:'#a72bc3a4',
                border:"1px solid ",
                borderRadius:'10px',
                textAlign:'center',
                background:'#ba4fd216'
              }}
              >
                  {message}
             </Typography>
            <Card 
              sx={{
                p:4,
                mt:5,
                bgcolor:'background.paper',
                width:{xs:'300px',sm:'300px',md:'400px'},
                minHeight:'300px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'column',
                zIndex:'1',
                borderRadius:'23px',
                boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.5)',
                position:'relative',
                overflow:'hidden',
                border:'0.1px solid rgba(49, 31, 155, 0.52)',
              }}>
                <Stack
                direction={'row'}
                sx={{
                    pt:'5px',pb:'5px',
                    borderRadius:'12px',
                    bgcolor:'background.default',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    mb:2,
                    gap:'3px',
                    width:'100%',
                }} 


                 >
                    <Button 
                    onClick={Signin}
                    sx={{
                        backgroundImage:sign!=='in'?'none':'',
                        color:sign!=='in'?'#737373':'',
                        width:'100%',
                    }}
                    >
                         Sign In
                    </Button>
                    <Button 
                    
                      onClick={SignUp}
                    sx={{
                        width:'100%',
                        backgroundImage:sign!=='up'?'none':'',
                        color:sign!=='up'?'#737373':'',
                       
                    }}
                       >
                         Sign Up
                    </Button>
                </Stack>
                   <Box sx={{display:sign==='in'?'':'none'}}>
                      <LoginPage/>
                    </Box>   
                    <Box sx={{display:sign==='up'?'':'none'}}>
                       <SignUpPage/>
                    </Box>        
                
            </Card>
          </Box>


)
}