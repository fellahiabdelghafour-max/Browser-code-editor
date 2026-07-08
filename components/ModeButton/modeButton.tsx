'use client'
import { IconButton } from "@mui/material";
import { useThemeModeContext } from "../../context/Theme&Toast";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
export default function ModeButton(){
    const {ChangeMode,mode}=useThemeModeContext();
            // position:'fixed',
            // top:'20px',
            // right:'20px',
    return(<IconButton
             color='primary'
         sx={{
            backgroundImage:"none",
            bgcolor:'background.secondary',
            border:'solid 1px #36397ca4',
         }}
    onClick={ChangeMode}>
        {mode!=='dark'?<DarkModeOutlinedIcon/>:<LightModeOutlinedIcon/>}
    </IconButton>)
}