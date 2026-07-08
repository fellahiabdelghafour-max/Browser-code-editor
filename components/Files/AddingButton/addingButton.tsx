import { IconButton, Stack, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

export default function AddingButton({setShowAddingField}:{setShowAddingField:(showAddingField:boolean)=>void}){
    return(            <Stack direction={'row'}  sx={{
                alignItems:'center',
                justifyContent:'space-between',
                borderBottom:'rgba(99,102,241,0.18) solid 0.1px',
                mb:2
                
                }}>
                <Typography variant="h6" sx={{color:'text.primary'}}>
                    <FolderOpenOutlinedIcon sx={{mr:1}} />
                    Files
                </Typography>
                <IconButton
                onClick={()=>{
                    setShowAddingField(true)
                    }}
                  sx={{
                    backgroundImage:'none'
                  }}>
                    <AddIcon sx={{color:'text.primary'}}/>  
                </IconButton>
            </Stack>)
}