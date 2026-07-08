import { Id } from "../../../../convex/_generated/dataModel";
import EditorLayout from "../../../../components/EditorLayout/EditorLayout";
import { Box } from "@mui/material";
import { getToken } from "../../../../lib/auth-server";
import { redirect } from "next/navigation";
import NavBar from "../../../../components/NavBar/navBar";

export default async function EditorPage({params}:{params: Promise<{workSpaceId: Id<'WorkSpace'>}>}){
     const id=(await params).workSpaceId;
     const token= await getToken();
         if(!token){
          redirect('/auth/sign_up')
         }
  return (
    <Box sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
    }}>
        <NavBar back='/workSpace'/> 
        <Box sx={{ flex: 1, overflow: 'hidden' }}> 
            <EditorLayout id={id} />
        </Box>
    </Box>   

       
    
  );
}

