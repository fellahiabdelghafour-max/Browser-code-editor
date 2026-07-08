import { OutlinedInput } from "@mui/material";
import { Box } from "@mui/material";

interface newFileProps{
showAddingField:boolean;
FileName:string;
CreateFile:(name:string,type:string)=>void
setFileName:(FileName:string)=>void
setShowAddingField:(showAddingField:boolean)=>void
}

import { ClickAwayListener } from "@mui/material";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

export default function NewFile({
    showAddingField,
    FileName,
    CreateFile,
    setFileName,
    setShowAddingField
}: newFileProps) {



    if (!showAddingField) return null;

    return (
        <ClickAwayListener onClickAway={()=>{
                    setShowAddingField(false);
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                mx: 1,
                my: 0.5,
                px: 1,
                height: '28px',
                borderRadius: '6px',
                bgcolor: 'background.paper',
                border: '1px solid rgba(99,102,241,0.4)',
                '&:focus-within': {
                    border: '1px solid rgba(99,102,241,0.8)',
                }
            }}>
                <InsertDriveFileOutlinedIcon sx={{ fontSize: '14px', color: 'text.disabled' }} />
                <OutlinedInput
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter'){
                                                console.log('doneslkdfjsdkflsjfklsjdfsflk')
                        if (FileName !== '') {
                        const newFile = {
                            Name: FileName,
                            type: (/^.*\.html$/).test(FileName) ? 'html'
                                : (/^.*\.css$/).test(FileName) ? 'css'
                                : (/^.*\.js$/).test(FileName) ? 'js'
                                : 'txt'
                        };
                        CreateFile(newFile.Name, newFile.type);
                        setFileName('');
                    }
                    setShowAddingField(false);
                        };

                    }}
                    value={FileName}
                    onChange={(e) => setFileName(e.target.value)}
                    onClick={(e)=>{
                         e.stopPropagation();
                    }}
                    sx={{
                        border:'none',
                        bgcolor:'background.secondary',
                        borderRadius:'0px',
                        flex: 1,
                        height: '24px',
                        fontSize: '13px',
                        '& fieldset': { border: 'none' },
                        '& input': { p: 0, color: 'text.primary' },
                    }}
                />
            </Box>
        </ClickAwayListener>
    );
}