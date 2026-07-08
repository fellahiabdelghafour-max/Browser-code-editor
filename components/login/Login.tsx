'use client';
import {Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import { useState, useTransition } from "react";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { passwordRegex } from "../sign_up/SignUp";
import { emailRegex } from "../sign_up/SignUp";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { useThemeModeContext } from "../../context/Theme&Toast";

    interface LoginInfo {
        email: string;
        password: string;
    }

export default function LoginPage() {
  const {setOpen,handleToast,setToast}=useThemeModeContext();
  const [isPending,startTransition]=useTransition();
  const [helperText, setHelperText] = useState<LoginInfo>({
    email: '',
    password: ''
  });
  const [info, setInfo] = useState<LoginInfo>({
    email: '',
    password: ''
  });
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
    function handleClickShowPassword(){
        setShowPassword((prev) => !prev);
      }


        function handleClick(){
       if(!emailRegex.test(info.email)){
            setHelperText((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
            handleToast?.('Please enter a valid email address.','info');
            setOpen(true);
          }
          else if(!passwordRegex.test(info.password)){
            setHelperText((prev) => ({ ...prev, password: 'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.' }));
            handleToast?.('Password must be at least 8 characters long and contain at least one letter, one number, and one special character.','info');
            setOpen(true);
          }
          else{
            startTransition(async()=>{
            try{
               const result= await authClient.signIn.email({
                    email: info.email,
                    password: info.password,
                  });                
              if(result.error) throw new Error(result.error.message);
              handleToast?.('Login successful','success');
              setOpen(true);
              router.push('/workSpace');
            }
            catch(err){
              handleToast?.((err as Error).message,"error");
              setOpen(true);
              console.log(err);
              
            }})
          }
          setTimeout(() => {
            setHelperText({
              email: '',
              password: ''
            });
            setToast?.(null);
          }, 3000);
          
        }
  return (<Stack
  direction="column"
  spacing={2}
  sx={{ width: '100%' }}
>

  <FormControl fullWidth>
    <InputLabel>Email</InputLabel>
    <OutlinedInput
    value={info.email}
    onChange={(e)=>{setInfo((prev)=>({...prev,email:e.target.value}))}}
      label="Email"
      type="email"
      placeholder="Enter your Email"
      startAdornment={
        <InputAdornment position="start">
          <EmailOutlinedIcon color="disabled" />
        </InputAdornment>
      }
    />
    <FormHelperText error={!!helperText.email}>{helperText.email}</FormHelperText>
  </FormControl>

  <FormControl fullWidth>
    <InputLabel>Password</InputLabel>
    <OutlinedInput
    value={info.password}
    onChange={(e)=>{setInfo((prev)=>({...prev,password:e.target.value}))}}
      type={showPassword ? 'text' : 'password'}
      label="Password"
      placeholder="Enter your Password"
      startAdornment={
        <InputAdornment position="start">
          <LockOutlinedIcon color='disabled' />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <IconButton
          sx={{
            backgroundImage:'none'
          }}
            onClick={handleClickShowPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
    <FormHelperText error={!!helperText.password}>{helperText.password}</FormHelperText>

  </FormControl>
   <Button
    onClick={handleClick}
    loading={isPending}
    loadingPosition="start"
    sx={{
        backgroundImage:isPending?'none':''
    }}>
        Sign In
    </Button>
    <Typography
    sx={{
        textAlign:"center",
        fontSize:'12px',
        color:'text.disabled',
        bgcolor:'background.secondary',
        p:1,
        borderRadius:'5px',
        mt:2,
        height:'30px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        gap:'5px',
    }}
    >
        Demo — Abdelghafour2007@gmail.com / Abdou2007@
    </Typography>
</Stack>
  );
}