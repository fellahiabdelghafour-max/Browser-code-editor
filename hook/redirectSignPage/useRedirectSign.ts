'use client'

import { useEffect, useState } from "react"

export default function useRedirectSign(){
    const [sign,setSign]=useState<'in'|'up'>( 'up')
    const [message,setMessage]=
    useState<'welcom back'|'Create account'>('Create account')
     
    useEffect(()=>{
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        sign==='up'? setMessage('Create account'):setMessage('welcom back');
    },[sign])
      function SignUp(){
        setSign('up')
      }
      function Signin(){
        setSign('in')
      }
      return {SignUp,Signin,message,sign}
}