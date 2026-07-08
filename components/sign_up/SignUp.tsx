'use client';
import {  Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from "@mui/material";
import { useState, useTransition } from "react";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { useThemeModeContext } from "../../context/Theme&Toast";
 export interface SignUpInfo {
  fullName: string;
  email: string;
  password: string;
}

export const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]{8,}$/;
export const fullNameRegex = /^[A-Za-z]{2,}( [A-Za-z]{2,})*$/;
 
export default  function SignUpPage() {
    const {setOpen,handleToast,setToast}=useThemeModeContext();
  const [isPending,startTransition]=useTransition();
  const [helperText, setHelperText] = useState<SignUpInfo>({
    fullName: '',
    email: '',
    password: ''
  });
  const [info, setInfo] = useState<SignUpInfo>({
    fullName: '',
    email: '',
    password: ''
  });
  const router = useRouter();

  function handleClick(){
    if(!fullNameRegex.test(info.fullName)){
      setHelperText((prev) => ({ ...prev, fullName: 'Please enter a valid full name.' }));
     handleToast?.('Please enter a valid full name.', 'info');
     setOpen(true);
    } 
    else if(!emailRegex.test(info.email)){
      setHelperText((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      handleToast?.('Please enter a valid email address.', 'info');
      setOpen(true);
    }
    else if(!passwordRegex.test(info.password)){
      setHelperText((prev) => ({ ...prev, password: 'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.' }));
      handleToast?.('Password must be at least 8 characters long and contain at least one letter, one number, and one special character.', 'info');
      setOpen(true);
    }
    else{
      startTransition(async()=>{
      try{
         const result= await authClient.signUp.email({
              name: info.fullName,
              email: info.email,
              password: info.password,
            });                
        if(result.error) throw new Error(result.error.message);
        handleToast?.('Account created successfully. Please check your email to verify your account.','success');
        setOpen(true);
        router.push('/workSpace');
      }
      catch(err){
        console.log(err);
        handleToast?.((err as Error).message,"error");
        setOpen(true);
      }})
    }
    setTimeout(() => {
      setHelperText({
        fullName: '',
        email: '',
        password: ''
      });
      setToast?.(null);
    }, 3000);
    
  }
  const [showPassword, setShowPassword] = useState<boolean>(false);
    function handleClickShowPassword(){
        setShowPassword((prev) => !prev);
      }
  return (
<Stack
  direction="column"
  spacing={2}
  sx={{ width: '100%' }}
>
  <FormControl fullWidth>
    <InputLabel>Full Name</InputLabel>
    <OutlinedInput
      value={info.fullName}
      onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
      placeholder="Enter your Full Name"
      label="Full Name"
      startAdornment={
        <InputAdornment position="start">
          <PersonOutlinedIcon color="disabled" />
        </InputAdornment>
      }
    />
    <FormHelperText error={!!helperText.fullName}>{helperText.fullName}</FormHelperText>
  </FormControl>

  <FormControl fullWidth>
    <InputLabel>Email</InputLabel>
    <OutlinedInput
      value={info.email}
      onChange={(e) => setInfo({ ...info, email: e.target.value })}
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
      onChange={(e) => setInfo({ ...info, password: e.target.value })}
      type={showPassword ? 'text' : 'password'}
      label="Password"
      placeholder="Enter your Password"
      startAdornment={
        <InputAdornment position="start">
          <LockOutlinedIcon color="disabled" />
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
    loading={isPending}
    loadingPosition="start"
    onClick={()=>{
      handleClick();
    }}
    sx={{
      backgroundImage:isPending?'none':''
    }}>
        Create Account
    </Button>
</Stack>
  );
}