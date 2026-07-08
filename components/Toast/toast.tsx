'use client'
import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useThemeModeContext } from '../../context/Theme&Toast';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
export default function CustomizedSnackbars() {

const {setOpen,open,toast}=useThemeModeContext();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
      sx={{
            backgroundImage:'none'
      }}>
        <Alert
        iconMapping={{
            success: <DoneOutlinedIcon fontSize="inherit" />,
            error: <DangerousOutlinedIcon fontSize="inherit" />,
            info: <WarningAmberOutlinedIcon fontSize="inherit" />,
          }}
           onClose={handleClose}
          severity={toast?.type}
          variant="filled"
          sx={{ width: '100%',            
           }}

           action={
            <IconButton color="inherit" size="small" onClick={handleClose}
            sx={{
                backgroundImage:'none'
            }}>
              <CloseIcon />
            </IconButton>
          }
        >
          {toast?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
