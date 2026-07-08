'use client'
import { Box, Button, Stack, Typography } from "@mui/material";
import { useFileBodyContext } from "../../context/FilesContext";
import { useEffect, useState, useTransition } from "react";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SaveOutlined } from "@mui/icons-material";
import { useThemeModeContext } from "../../context/Theme&Toast";
import { Editor } from "@monaco-editor/react";

export default function EditorComponent() {

    const context=useFileBodyContext();
    const FileId = context?.FileId;
    const File = useQuery(api.workSpace.getFileById, {FileId} );
    const [text,setText]=useState<string|undefined>(File?.body || '');

    const {mode}=useThemeModeContext();
    useEffect(()=>{
        setText(File?.body)
    },[File])
    const color=File?.type==='html'
                 ?'#f97316':
                 File?.type==='css'
                 ?'#55f7ef'
                 :File?.type==='js'
                 ?'#c3d406'
                 :'#9e9e9e';

    const {handleToast,setOpen}=useThemeModeContext()
   {/*Updating File Content*/}
    const [isPending,startTransition]=useTransition()
    const updateFileBody=useMutation(api.workSpace.updateFileBodyById);
    function UpdateBody(){
        try{
            startTransition(()=>{
                if(text){
                updateFileBody({FileId:File?File._id:undefined,body:text})
                handleToast?.('Saved successfully','success')
                }
            })            
        }
        catch{handleToast?.('Error check yor internet','error')}

    setOpen(true)
    }
   {/*==Updating File Content==*/}

    if(!(FileId && File))return(<Box 
        sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            height:'100%',
            width:{sm:'100vw',md:'100%'},
            bgcolor:'background.default'

        }}>
            <Typography 
            variant="h2"
            sx={{
                color:'text.disabled',
                textAlign:'center'
            }}>
                No File Sellected !!
            </Typography>
        </Box>)

return (
    <Box sx={{ 
        display: "flex", 
        flexDirection: "column", 
        height: "100%",
        bgcolor: 'background.default',
        width:{sm:'100vw',xs:'100vw',md:'100%',lg:'100%'}
    }}>  
        {/* Top Bar */}
        <Box sx={{
            width: '100%',
            borderBottom: '1px solid rgba(99,102,241,0.18)',
            height: '40px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1,
        }}>
            <Typography sx={{
                borderBottom: `2px solid ${color}`,
                display: 'flex',
                px: 1.5,
                py: 0.5,
                gap: 0.5,
                alignItems: 'center',
                fontSize: '13px',
            }}>
                <InsertDriveFileOutlinedIcon sx={{ color: color, fontSize: '15px' }}/>
                {File.Name}
            </Typography>

            <Button
                onClick={UpdateBody}
                loading={isPending}
                loadingPosition='start'
                startIcon={<SaveOutlined sx={{ fontSize: '15px !important' }}/>}
                sx={{
                    backgroundImage: 'none',
                    bgcolor: 'transparent',
                    border: '1px solid rgba(99,102,241,0.25)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: 'text.disabled',
                    height: '28px',
                    ':hover': {
                        bgcolor: 'rgba(99,102,241,0.1)',
                        color: 'text.primary',
                        border: '1px solid rgba(99,102,241,0.5)',
                    }
                }}>
                Save
            </Button>
        </Box>

        {/* Editor */}
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <Editor
                key={File._id}
                height="100%"
                beforeMount={(monaco) => {
                    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
                }}
                onMount={(editor) => {
                    editor.updateOptions({ tabSize: 2 });
                }}
                theme={mode === 'dark' ? "vs-dark" : 'light'}
                value={text}
                language={
                    File.type === 'html' ? 'html' :
                    File.type === 'js' ? 'javascript' :
                    File.type === 'css' ? 'css' : ''
                }
                onChange={(value) => setText(value)}
                options={{
                    fontSize: 14,
                    fontFamily: "'Fira Code', monospace", // ← font احترافي
                    fontLigatures: true,
                    minimap: { enabled: false },          // ← يوفر مساحة
                    scrollbar: { verticalScrollbarSize: 6 },
                    lineNumbers: 'on',
                    wordWrap: 'on',
                    padding: { top: 12 },
                    smoothScrolling: true,
                    cursorSmoothCaretAnimation: 'on',
                    renderLineHighlight: 'line',
                }}
            />
        </Box>

        {/* Bottom Bar */}
        <Box sx={{
            width: '100%',
            borderTop: '1px solid rgba(99,102,241,0.18)',
            height: '28px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
        }}>
            <Stack direction='row' spacing={1.5}>
                <Typography sx={{
                    color: color,
                    fontSize: '11px',
                    fontWeight: 600,
                    bgcolor: `${color}18`,
                    px: 1,
                    borderRadius: '4px',
                }}>
                    {File.type.toUpperCase()}
                </Typography>
                <Typography sx={{ color: 'text.disabled', fontSize: '11px' }}>
                    {File.Name}
                </Typography>
            </Stack>
            <Typography sx={{ color: 'text.disabled', fontSize: '11px' }}>
                {text?.split('\n').length ?? 1} lines
            </Typography>
        </Box>
    </Box>
);
}