import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";

import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import CheckIcon from '@mui/icons-material/Check';
import { Id } from "../../../convex/_generated/dataModel";



type Props = {
  setEditedFile: (EditedFile:Id<'Files'>|null)=>void;
  setFileName: (name: string) => void;
  setShowButtons: (showButtons:string) => void;
  FilterFiles?: {
    _id: Id<"Files">;
    _creationTime: number;
    type: string;
    Name: string;
    UserId: string;
    workSpaceId: Id<"WorkSpace">;
    body: string;
}[] | null | undefined;
  EditedFile?: Id<'Files'> | null;
  setSellectedFile: (sellectedFile:Id<"Files"> | string) => void;
  setFile?: (File:Id<'Files'>) => void;
  sellectedFile?: Id<"Files"> | string;
  FileName?: string;
  UpdateFileName: () => void;
  showButtons?: string;
  setOpenD: (openD: boolean) => void;
  setFileId: (FileId:Id<'Files'>) => void;
};

export default function FilesField({setEditedFile,
                                    setFileName,
                                    setShowButtons,
                                    FilterFiles,
                                    EditedFile,
                                    setSellectedFile,
                                    setFile,
                                    sellectedFile,
                                    FileName,
                                    UpdateFileName,
                                    showButtons,
                                    setOpenD,
                                    setFileId}: Props)
    {
    return(

           <Stack>
               {FilterFiles?.map((file)=><Box key={file._id}

               onMouseMove={()=>{
                setShowButtons(file._id)
               }}
               onMouseLeave={()=>{
                setShowButtons('')
               }}
               onClick={()=>{
                setSellectedFile(file._id);
                setFile?.(file._id)
                if(EditedFile && EditedFile!==file._id){
                  setEditedFile(null)
                }
               }}
               sx={{
                 backgroundImage:'none',
                 justifyContent:'space-between',
                 width:'100%',
                 background:file._id===sellectedFile?'#3f05544e':'',
                 borderRadius:'0px',
                 borderLeft:file._id===sellectedFile?'solid 4px #8c00ff':'',
                 display:'flex',
                 alignItems:'center',
                 minHeight:'40px',
                 borderBottom:'solid 0.5px rgba(99,102,241,0.18)',
                 ':hover':{
                    transition:'0.1s',
                    bgcolor:'#332f44'
                 }
               }}>
                <Stack direction={'row'}
                  sx={{
                    justifyContent:'center',
                    alignItems:'center'
                  }}>
                  <Typography
                  sx={{
                    fontSize:'15px ',
                    fontWeight:900,
                    color:'gray',
                    display:file._id===sellectedFile?'':'none',
                    m:1,
                  }}>
                        {'>'}
                        
                  </Typography>
                  <InsertDriveFileOutlinedIcon
                  sx={{
                color:file.type==='html'
                 ?'#f97316':
                 file.type==='css'
                 ?'#55f7ef'
                 :file.type==='js'
                 ?'#c3d406'
                 :'#9e9e9e'
                  }}/>
                    <Typography
                    sx={{
                      fontWeight:sellectedFile===file._id?500:'',
                      color:sellectedFile===file._id?'':'text.disabled',
                      display:EditedFile===file._id ?'none':''
                    }}>
                      {file.Name}
                    </Typography>

                    <TextField
                        value={FileName}
                        onKeyDown={(e)=>
                        {
                          if(e.nativeEvent.key==='Enter' && EditedFile===file._id){
                               UpdateFileName();
                          }
                        }
                        }
                        onChange={(e)=>{
                          setFileName(e.target.value);
                        }}
                        fullWidth
                        variant="standard"
                        sx={{
                            '& .MuiInput-underline:before': {
                                borderBottom: '2px solid rgba(78, 0, 196, 0.3)',
                                mb:0.7
                            },
                            '& .MuiInput-underline:after': {
                                borderBottom: '2px solid #4e00c4',
                                mb:0.7
                            },
                            '& .MuiInput-underline:hover:before': {
                                borderBottom: '2px solid rgba(78, 0, 196, 0.6) !important',
                                mb:0.7
                            },
                            display:EditedFile===file._id ?'':'none'
                        }}
                    />                    
                </Stack>


                      <Stack direction={'row'}
                      sx={{
                        right:'88%',
                        display:showButtons===file._id && !(EditedFile===file._id)?'':'none'
                      }}>
                        <IconButton
                        onClick={()=>{
                          setFileName(file.Name);
                          setEditedFile(file._id)
                        }}
                        sx={{
                          backgroundImage:'none',
                          ':hover':{
                            background:'none'
                          },
                          width:'20px',
                          height:'20px'
                        }}>
                        <EditOutlinedIcon
                          sx={{
                            fontSize:'18px',
                            color:'#118fd3a1',
                          }}/>                          
                        </IconButton>

                          <IconButton
                          onClick={()=>{
                            setOpenD(true);
                            setFileId(file._id);
                            setFileName(file.Name)
                          }}
                          sx={{
                            backgroundImage:'none',
                            ':hover':{
                              background:'none'
                            },
                            width:'20px',
                            height:'20px'
                          }}>
                        <DeleteOutlinedIcon
                          sx={{
                            fontSize:'18px',
                            color:'#d31111a1',
                          }}/>                            
                          </IconButton>
                      </Stack>

                          <IconButton
                          onClick={UpdateFileName}
                          sx={{
                            display:EditedFile===file._id ?'':'none',
                            backgroundImage:'none',
                            ':hover':{
                              background:'none'
                            },
                            width:'20px',
                            height:'20px'
                          }}>
                        <CheckIcon
                          sx={{
                            fontSize:'18px',
                            color:'#11d331a1',
                          }}/>                            
                          </IconButton>                   

                                      
               </Box>)}
           
           </Stack>            
    )
}