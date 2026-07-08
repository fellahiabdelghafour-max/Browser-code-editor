'use client'
import { Box, Button, Card, CardContent, Collapse, IconButton, Stack, Typography } from "@mui/material";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useEffect, useState } from "react";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OfflineBoltOutlinedIcon from '@mui/icons-material/OfflineBoltOutlined';


{/*runtime Code*/}
    const runtimeCode= `\n document.addEventListener("click", (e) => {
    const link = e.target.closest("a");

    if (!link) return;

    e.preventDefault();

    window.parent.postMessage({
        type: "navigate",
        href: link.getAttribute("href")
    }, "*");
});

window.onerror = function(message, source, line, column, error) {

    window.parent.postMessage({
        type: "error",
        message,
        line,
        column
    }, "*");

};
window.addEventListener("unhandledrejection", (event) => {

    window.parent.postMessage({

        type: "error",

        message: event.reason

    }, "*");

});

    const oldLog = console.log;

console.log = (...args)=>{

    oldLog(...args);

    window.parent.postMessage({

        type:"console",

        args

    },"*");


}\n`
  {/*==runtime Code==*/}


export default function Preview(id:{id:Id<'WorkSpace'>}) {
    
    const [openWindow,setOpenWindow]=useState<'Preview'|'Console'>('Preview')
    const [reload,setReload]=useState<number>(0)
      // js Lines - (all Lines + error line)
    const [ErrorLine,setErrorLine]=useState<string>('')


    {/*console content*/}
    type data={
        args?:string[];
        message?:string;
        stack?:string;
        line?:string;
        column?:string;
    }
    type TerminalItem = {
    id: number;
    type: "log" | "error";
    data: data;
};
const [consoleMessages, setConsoleMessages] = useState<TerminalItem[]>([]);

    {/*==console content==*/}
    
{/*geting the home page*/}
    const Files = useQuery(api.workSpace.getFilesByWorkSpaceId, { workSpaceId: id.id });
    const [currentFile, setCurrentFile] = useState('Index.html');
    const [doc, setDoc] = useState<string>('');
    const Index = Files?.find((file) => file.Name === currentFile)?.body ?? '';
{/*==geting the home page==*/}

{/*concatinate home page with css & js files*/}
    useEffect(() => {

        function getDep(htmlBody: string) {
            if (!htmlBody) {
                setDoc('');
                return;
            }

            const style: string[] = [];
            const app: string[] = [];

            const parser = new DOMParser();
            const parsedDoc = parser.parseFromString(htmlBody, 'text/html');

        //<<getting all link tags from the home page
            parsedDoc.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
                const href = link.getAttribute('href');
                if (href) {
                    const FileName = href.split('/').pop() as string;
                    style.push(FileName);
                }
                const styleTag = parsedDoc.createElement('style');
                styleTag.textContent = 
                style.map((S) => Files?.find((file) => file.Name === S)?.body ?? '').reduce((acc, file) => `${acc}\n${file}`, '');
                link.replaceWith(styleTag);
            });
        //getting all link tags from the home page>>

        //<<getting all script tags from the home page
            parsedDoc.querySelectorAll('script[src]').forEach((script) => {
                const src = script.getAttribute('src');
                if (src) {
                    const fileName = src.split('/').pop() as string;
                    app.push(fileName);
                }

                const ScriptTag = parsedDoc.createElement('script');
                const jsCode=app.map((A) => Files?.find((file) => file.Name === A)?.body ?? '').reduce((acc, file) => `${acc}\n${file}`, '') ;
                setErrorLine((jsCode.split('\n').length-doc.split('\n').length).toString())
                try {

                    new Function(jsCode);

                    ScriptTag.textContent = runtimeCode + jsCode;

                } catch (err) {
                    const e = err as Error;
                    setConsoleMessages(old => [
                                ...old,
                                { 
                                    id:Date.now(),
                                    type:'error',
                                    data:{
                                        message:e.message,
                                        stack:e.stack
                                    }
                                    
                                    
                                }
                            ]);

                }
                   
                script.replaceWith(ScriptTag);                    
                }

            );
        //getting all script tags from the home page>>

        //<<sending runtime code to body if the is no script tags from user
              if(app.length===0){
                    const runtime=parsedDoc.createElement('script');
                    runtime.textContent=runtimeCode
                    parsedDoc.body.appendChild(runtime);
                    
                }
        //sending runtime code to body if the is no script tags from user>>
        
        //<<converting parsed document to string and seding it to doc state
            setDoc(parsedDoc.documentElement?.outerHTML ?? '');
        //converting parsed document to string and seding it to doc state>>

        }

        getDep(Index);
    }, [Index, Files, reload,doc]);

{/*==concatinate home page with css & js files==*/}

{/*break the <a></a> tage routing*/}
        useEffect(() => {

    const handler = (event: MessageEvent) => {

        if (event.data.type === "navigate") {
            setCurrentFile(event.data.href);
        }

        if (event.data.type === "console") {
            setConsoleMessages(old => [
                ...old,
                {
                    id:Date.now(),
                    type:'log',
                    data:{ args: event.data.args }
                }
            ]);
        }
    if(event.data.type==="error"){

    setConsoleMessages(old=>[

        ...old,

        {
            id:Date.now(),
            type:'error',
            data:{
                message:event.data.message,
                line:event.data.line,
                column:event.data.column,
            }
        }

    ]);        

    };


}

    window.addEventListener("message", handler);

    return () => window.removeEventListener("message", handler);
}, []);
{/*==break the <a></a> tage routing==*/}









  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    return (
        <Box
         sx={{ 
            display: "flex",
             flexDirection: "column",
             alignItems: "center",
             justifyContent: "center",
            bgcolor: 'background.paper',
            color:'white',
            height:'100%',
            width:{sm:'100vw',xs:'100vw',md:'100%',lg:'100%'}
         }}    >
        <Stack direction={'row'} 
           spacing={2}
             sx={{justifyContent:'flex-start',
                width:'100%',
                p:1,
                pl:10
             }}
               >
            <Button 
               onClick={()=>{setOpenWindow('Preview')}}
               sx={{
                backgroundImage:openWindow==='Preview'?'':'none'
               }}>
                <RemoveRedEyeOutlinedIcon/>
                Preview
            </Button>
            <Button 
               onClick={()=>{setOpenWindow('Console')}}
               sx={{
                backgroundImage:openWindow==='Console'?'':'none'
               }}>
                <TerminalOutlinedIcon/>
                Console
            </Button>
            <IconButton
               onClick={()=>setReload(reload+1)}
               sx={{fontSize:'15px',width:'auto'}}> 
                <OfflineBoltOutlinedIcon/>Run
            </IconButton>
        </Stack>

            <Box 
            sx={{
                height:'90%',
                width:'100%',
                display:openWindow==='Preview'?'':'none',
                overflow:'hidden'
            }}>      
           <iframe
        key={reload}
        srcDoc={doc}
        style={{
        width:"100%",
        height:"100%",
        border:"none",
        display:'block'
    }}
/>
</Box>
{/* Console */}
<Box sx={{
    width: '100%',
    height: '100%',
    display: openWindow === 'Console' ? 'flex' : 'none',
    flexDirection: 'column',
    bgcolor: '#0d1117',
    overflow: 'hidden',
}}>
    {/* Console Header */}
    <Stack direction='row'
        sx={{ px: 2, py: 0.5, borderBottom: '1px solid rgba(99,102,241,0.2)' }}>
        <Stack direction='row' spacing={1} >
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f59e0b' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e' }} />
        </Stack>
        <Button
            onClick={() => setConsoleMessages([])}
            sx={{
                backgroundImage: 'none',
                bgcolor: 'transparent',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '11px',
                ':hover': { color: 'white', bgcolor: 'transparent' }
            }}>
            Clear
        </Button>
    </Stack>

    {/* Console Messages */}
    <Box sx={{
        flex: 1,
        overflowY: 'auto',
        p: 1,
        fontFamily: "'Fira Code', monospace",
        fontSize: '13px',
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-thumb': {
            background: 'rgba(99,102,241,0.4)',
            borderRadius: '4px'
        },
    }}>
        {consoleMessages.length === 0 
            ? <Box sx={{ color: 'rgba(255,255,255,0.2)', p: 1 }}>No console output</Box>
            :consoleMessages.map((msg, i) => {
                if(msg.type==='log') {
                return(
             
                <Box key={i} sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    py: 0.5,
                    px: 1,
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    ':hover': { bgcolor: 'rgba(255,255,255,0.03)' }
                }}>
                    <Box sx={{ color: 'rgba(99,102,241,0.7)', fontSize: '11px', mt: 0.2, userSelect: 'none' }}>
                        {i + 1}
                    </Box>
                    <Box sx={{ color: '#e2e8f0', wordBreak: 'break-all' }}>
                        {msg.data?.args}
                    </Box>
                </Box>
            )}     
                 if(msg.type==='error') {
                return (
<Card key={i} sx={{
    width: '100%',
    mb: 0.5,
    bgcolor: 'rgba(239,68,68,0.06)',
    border: '1px solid rgba(239,68,68,0.15)',
    borderLeft: '3px solid rgba(239,68,68,0.7)',
    borderRadius: '8px',
    overflow: 'hidden',
    ':hover': { bgcolor: 'rgba(239,68,68,0.1)' },
    transition: '0.15s',
    fontSize:'25px'
}}>
    <CardContent sx={{ py: 1, px: 1.5, '&:last-child': { pb: 1 } }}>
        <Stack direction='row'>

            {/* Left: icon + message */}
            <Stack direction='row' spacing={0.8}sx={{ flex: 1 }}>
                <HighlightOffIcon sx={{ fontSize: '15px', color: 'rgba(239,68,68,0.8)', mt: 0.3, flexShrink: 0 }} />
                <Typography sx={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.85)',
                    fontFamily: 'monospace',
                    wordBreak: 'break-word',
                    lineHeight: 1.5,
                }}>
                    {msg.data.message}
                </Typography>
            </Stack>

            {/* Right: line:col + expand */}
            <Stack direction='row' spacing={0.5} sx={{ flexShrink: 0, ml: 1 ,}}>
                 
                    <Typography sx={{
                        fontSize: '11px',
                        color: 'rgba(59,130,246,0.8)',
                        fontFamily: 'monospace',
                        bgcolor: 'rgba(59,130,246,0.08)',
                        px: 0.8,
                        py: 0.2,
                        borderRadius: '4px',
                        ':hover': { color: '#3b82f6' },
                        cursor: 'pointer',
                        display:msg.data.line ?'':'none'
                    }}>
                        {(Number(ErrorLine)+Number(msg.data.line)).toString()}:{msg.data.column}
                    </Typography>
                
                <IconButton
                    onClick={handleExpandClick}
                    sx={{
                        width: 22, height: 22,
                        backgroundImage: 'none',
                        ':hover': { background: 'rgba(255,255,255,0.05)' },
                        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: '0.2s',
                        display:msg.data.stack ?'':'none'
                    }}>
                    <ExpandMoreIcon sx={{ fontSize: '16px', color: 'text.disabled' }} />
                </IconButton>
            </Stack>
        </Stack>
    </CardContent>

    <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{
            px: 1.5, pb: 1,
            borderTop: '1px solid rgba(239,68,68,0.1)',
            bgcolor: 'rgba(0,0,0,0.2)',
            display:msg.data.stack ? '':'none'
        }}>
            <Typography sx={{
                fontSize: '11px',
                fontFamily: 'monospace',
                color: 'rgba(255,255,255,0.4)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                pt: 1,
            }}>
                {msg.data.stack}
            </Typography>
        </Box>
    </Collapse>
</Card>)}            
   })
        }
        
    </Box>

</Box>
   
        </Box>
    )
}