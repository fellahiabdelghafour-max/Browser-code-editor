'use client'

import { useState } from "react"

export default function useHandleButtons(){
     const [open,setOpen]=useState<'Files'|'Editor'|'Preview'>('Preview');

     return {open,setOpen}
}