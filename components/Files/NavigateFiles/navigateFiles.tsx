import { Box, Button } from "@mui/material"

interface NaviagteFilesProps{
    setFileType:(FileType:string)=>void;
    FileType:string
}

export default function NaviagteFiles({
                                    setFileType,
                                    FileType,
                                        }:NaviagteFilesProps){

    return(
                            <Box sx={{ p: 1 }}>
                    {[
                        { label: 'All',  color: '#6366f1', bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.4)' },
                        { label: 'HTML', color: '#f97316', bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.4)' },
                        { label: 'CSS',  color: '#55e1f7', bg: 'rgba(85, 242, 247, 0.15)', border: 'rgba(85, 242, 247, 0.4)' },
                        { label: 'JS',   color: '#b9d81c', bg: 'rgba(191, 212, 6, 0.15)',  border: 'rgba(205, 212, 6, 0.4)'  },
                    ].map((item) => (
                        <Button
                        key={item.label}
                        onClick={()=>{
                            setFileType(item.label)
                        }}
                        sx={{
                            color:FileType===item.label? item.color:'#c4c1c179',
                            bgcolor:FileType===item.label? item.bg:'',
                            border: FileType===item.label?`1px solid ${item.border}`:'',
                            borderRadius: '6px',
                            fontSize: '12px',
                            px: 1.5,
                            py: 0.5,
                            textTransform: 'none',
                            backgroundImage: 'none',
                            minWidth:'55px',
                            width:'auto',
                            ':hover': {

                            }
                        }}
                        >
                        {item.label}
                        </Button>
                    ))}
                    </Box>
    )
}