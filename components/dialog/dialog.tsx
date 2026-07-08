'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AlertDialogSlide( message: string, open: boolean, setOpen: (open: boolean) => void, onConfirm: () => void ) {

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: { 
            bgcolor: 'background.paper',
            borderRadius: '16px',
            boxShadow: '0px 0px 30px rgba(111, 111, 111, 0.6)',
            border: '1px solid rgba(58, 88, 237, 0.3)',
            minWidth: '360px',
            position: 'relative',
            overflow: 'hidden',

            }
          }
        }
      }
    >
      <DialogTitle sx={{ color: 'text.primary', fontWeight: 700, pt: 3 }}>
        Delete?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'text.disabled' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={handleClose}
          sx={{
            color: 'text.disabled',
            backgroundImage: 'none',
            bgcolor: 'background.secondary',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          sx={{
            backgroundImage: 'none',
            bgcolor: 'rgb(255, 0, 0)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px',
            '&:hover': { bgcolor: 'rgba(239,68,68,0.25)' }
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}