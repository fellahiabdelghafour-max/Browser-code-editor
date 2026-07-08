import { useState } from "react";

export default function useToast() {
    const [open,setOpen]=useState<boolean>(false)
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);  

  function handleToast(message: string, type: "success" | "error" | "info") {
    setToast({ message, type });
  }

  return { toast, setToast, handleToast,open,setOpen };
}