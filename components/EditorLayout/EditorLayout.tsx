'use client'
import { Box, Button, Grid, Stack} from "@mui/material";
import FileProvider from "../../context/FilesContext";
import Files from "../Files/Files";
import EditorComponent from "../Editor/Editor";
import Preview from "../Preview/Preview";
import { Id } from "../../convex/_generated/dataModel";
import useHandleButtons from "../../hook/useHandleButtons/useHndleButtons";


export default function EditorLayout({id}:{id:Id<'WorkSpace'>}){
     const {open,setOpen}=useHandleButtons();
  return (
    <FileProvider>
      
<Grid container sx={{
    display: { xs: 'none', md: 'flex' },
    height: '100%', // ← يملأ الـ parent فقط
    overflow: 'hidden',
}}>
    <Grid size={{ lg: 2 }} sx={{ height: '100%',overflowY:'auto',overflowX:'hidden' }}>
        <Files id={id} />
    </Grid>
    <Grid size={{ md: 8, lg: 6 }} sx={{ height: '100%' }}>
        <EditorComponent />
    </Grid>
    <Grid size={{ md: 4, lg: 4 }} sx={{ height: '100%' }}>
        <Preview id={id} />
    </Grid>
</Grid>
      <Box sx={{width:'100%',maxHeight:'100vh',minHeight:'90vh',display:{xs:'flex',sm:'flex',md:'none',lg:'none'}}}>
          <Box sx={{display:open==='Files'?'':'none'}}>
            <Files id={id}/>
          </Box>
          <Box sx={{display:open==='Editor'?'':'none'}}>
            <EditorComponent/>
          </Box>
          <Box sx={{display:open==='Preview'?'':'none'}}>
            <Preview id={id}/>
          </Box>
        </Box> 

            <Stack direction={'row'} 
             sx={{zIndex:1,
             width:'100%',
             position:'fixed',
             display:{xs:'flex',sm:'flex',md:'none',lg:'none'},
             bgcolor:'background.default'}}>
              <Button
              fullWidth
              sx={{
                backgroundImage:open==='Files'?'':'none',
                bgcolor:'background.secondary',
              }}
                onClick={()=>{
                  setOpen('Files')
                }}>
                   Files
              </Button>

              <Button
              fullWidth
              sx={{
                backgroundImage:open==='Editor'?'':'none',
                bgcolor:'background.secondary',
              }}
                onClick={()=>{
                  setOpen('Editor')
                }}>
                 Editor
              </Button>

              <Button
              fullWidth
              sx={{
                backgroundImage:open==='Preview'?'':'none',
                bgcolor:'background.secondary',
              }}
                onClick={()=>{
                  setOpen('Preview')
                }}>
                   Preview
              </Button>                
            </Stack>




    </FileProvider>
    
  );
}

