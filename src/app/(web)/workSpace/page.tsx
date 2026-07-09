'use client'
import { Box, Button, Card, Grid, IconButton, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { AddOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import CodeSharpIcon from '@mui/icons-material/CodeSharp';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import { useThemeModeContext } from "../../../../context/Theme&Toast";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import AlertDialogSlide from "../../../../components/dialog/dialog";
import { authClient } from "../../../../lib/auth-client";
import { useRouter } from "next/navigation";
import NavBar from "../../../../components/NavBar/navBar";

export default function WorkSpaces(){

    const [openD,setOpenD]=useState(false)
    const {handleToast,setOpen}=useThemeModeContext();
   const [id,setId]=useState<string>('');
  // fetching workspaces
   const WorkSpaces=useQuery(api.workSpace.getWorkSpaces);


   {/*Creating workspace*/}
   const [showCreatingCard,setShowCreatingCard]=useState<boolean>(false)
   const createWorkSpaceMutation = useMutation(api.workSpace.createWorkSpace);
   const [workSpace,setWorkSpace]=useState({
    Name:'',
    description:'',
   })   
   async function CreateWorkSpace(){
    const  msg= await createWorkSpaceMutation({ Name: workSpace.Name, description: workSpace.description });
     setShowCreatingCard(false);
     setWorkSpace({Name:'',description:''});
     handleToast?.(msg,'success')
   }
   {/*==Creating workspace==*/}



  {/*Deleting workspace*/}
   const deleteWorkSpaceMutation=useMutation(api.workSpace.deleteWorkSpace);
   const [DeletedWorkspade,setDeletedWorkspace]=useState<{id:Id<'WorkSpace'>,Name:string}>();
    async function DeleteWorkSpace(id:Id<'WorkSpace'>){
    try{
      const msg= await deleteWorkSpaceMutation({id})
     handleToast?.(msg,'success')
    }
    catch{
        handleToast?.('Error','error')
    }
    setOpen(true);
    setOpenD(false);

   }
  {/*==Deleting workspace==*/}

  {/*verify user*/}
   const {data,isPending} = authClient.useSession()
   const router=useRouter()
   if(isPending) return;
       if(!data){
         router.push('/auth')
       }
  {/*==verify user==*/}





return(<Box
       sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        minHeight:'100vh'
       }}>
        <Box sx={{position:'fixed',top:2,width:'100vw',height:'60px',bgcolor:'background.default'}}>
          <NavBar back={'/'}/>
        </Box>
        <Typography sx={{color:'#9b080894',mb:2}}>
             Important note: The index file must be named Index.html.
        </Typography>
      <Button
      sx={{
        mb:2
      }}
      onClick={()=>{setShowCreatingCard(true)}}>
       <AddOutlined/> Create new project
      </Button>
      {AlertDialogSlide(
        `"${DeletedWorkspade?.Name}" will be permanently removed.`,
        openD,
        setOpenD,
        () => {
          if (DeletedWorkspade?.id) DeleteWorkSpace(DeletedWorkspade.id)
        }
      )}
       <Card
            sx={{
                p:4,
                bgcolor:'background.paper',
                minWidth:{xs:'200px',sm:'300px',md:'400px',lg:'600px'},
                minHeight:'200px',
                display:showCreatingCard?'flex':'none',
                alignItems:'flex-start',
                justifyContent:'flex-start',
                flexDirection:'column',
                zIndex:'1',
                borderRadius:'18px',
                boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.5)',
                position:'relative',
                overflow:'hidden',
                border:'0.1px solid rgba(49, 31, 155, 0.52)',
                gap:'10px',
                mb:3
                    
            }}
       >
         <Typography>
              New Project
         </Typography>
          <TextField fullWidth
          value={workSpace.Name}
          onChange={(e)=>{
            setWorkSpace({...workSpace,Name:e.target.value})
          }}/>
          <TextField fullWidth
          value={workSpace.description}
          onChange={(e)=>{
            setWorkSpace({...workSpace,description:e.target.value})
          }}/>
          <Stack direction={'row'} spacing={2}>
            <Button
             onClick={()=>{
                CreateWorkSpace()
             }}>
              <DoneOutlinedIcon/> Create
            </Button>
            <Button
            onClick={()=>{
                setShowCreatingCard(false)
            }}
            sx={{
                backgroundImage:'none',
                bgcolor:'#1a115c53',
                color:'text.disabled'
            }}>
                Cansel
            </Button>
          </Stack>
       </Card>
      <Grid
       container 
       spacing={2}
       sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
       }}>
        {   WorkSpaces===undefined
            ?Array(6).map((i)=>{return(<Card
              key={i}
              sx={{
                p:4,
                bgcolor:'background.paper',
                width:{xs:'200px',sm:'200px',md:'300px'},
                minHeight:'200px',
                display:'flex',
                alignItems:'flex-start',
                justifyContent:'flex-start',
                flexDirection:'column',
                zIndex:'1',
                borderRadius:'18px',
                boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.5)',
                position:'relative',
                overflow:'hidden',
                border:'0.1px solid rgba(49, 31, 155, 0.52)',
                gap:'10px',
                    }}
            >
                <Skeleton sx={{width:'20%',height:'30px'}}/>
                <Skeleton sx={{width:'60%',height:'30px'}}/>
                <Stack direction={'row'} spacing={1}>
                    <Skeleton sx={{width:'50px',height:'30px'}}/>
                    <Skeleton sx={{width:'50px',height:'30px'}}/>
                    <Skeleton sx={{width:'50px',height:'30px'}}/>
                </Stack>
                <Skeleton sx={{width:'60%',height:'30px'}}/>
            </Card>)

            })
            :WorkSpaces?.length===0
            ?
            <Stack
              sx={{
                justifyContent:'center',
                alignItems:'center'
              }}>

                <FolderCopyOutlinedIcon
                  sx={{
                    fontSize:60,
                    color:'text.disabled'
                  }}/>                    


            <Typography
              sx={{
                color:'text.disabled',
                fontWeight:600
              }}>
                
                No Projcts yet ___ Create one
            </Typography>                
            </Stack>

            :
            WorkSpaces?.map((workspace)=><Grid key={workspace._id} >
            <Card
            onMouseMove={()=>{
                setId(workspace._id)
            }}
            onMouseLeave={()=>{
                setId('')
            }}
            sx={{
                p:4,
                bgcolor:'background.paper',
                width:{xs:'200px',sm:'200px',md:'300px'},
                minHeight:'200px',
                display:'flex',
                alignItems:'flex-start',
                justifyContent:'flex-start',
                flexDirection:'column',
                zIndex:'1',
                borderRadius:'18px',
                boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.5)',
                position:'relative',
                overflow:'hidden',
                border:'0.1px solid rgba(49, 31, 155, 0.52)',
                gap:'10px',
                ':hover':{
                     bgcolor:'background.secondary',
                                },
                    '::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '7px',
                    background: 'linear-gradient(to right, #3b82f6 30%, #7c3aed 90%)',
                    borderRadius: '23px 23px 0 0',
                }
            }}>         
                    
                         <IconButton
                         onClick={()=>{
                            setOpenD(true);
                            setDeletedWorkspace({id:workspace._id,Name:workspace._id})
                         }}
                          sx={{
                            backgroundImage:'none',
                                position:'absolute',
                                right:3,
                                top:20,
                                color:'#a6070770',
                                display:workspace._id===id?'':'none',
                                ":hover":{
                                    background:'none'
                                }                            
                          }}>
                            <DeleteOutlineOutlined
                            sx={{

                            }}/>
                         </IconButton>
                
                         <Typography
                           sx={{
                            backgroundImage:'linear-gradient(to right, #3b82f6 30%, #7c3aed 90%)',
                            width:'40px',
                            height:'40px',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:'12px'
                           }}>

                            <CodeSharpIcon/>
                         </Typography>
                            
                      <Typography
                        sx={{
                            fontSize:'25px',
                            fontWeight:500
                        }}>
                         {workspace.Name}
                      </Typography>
                      <Typography
                        sx={{
                            color:'text.disabled',
                            whiteSpace:'normal',
                            wordBreak:'break-word'
                        }}>
                        {workspace.description}
                      </Typography>
                    <Stack direction="row" spacing={0.5} sx={{ p: 1 }}>
                    {[
                        { label: 'HTML', color: '#f97316', bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.4)' },
                        { label: 'CSS',  color: '#a855f7', bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.4)' },
                        { label: 'JS',   color: '#06b6d4', bg: 'rgba(6,182,212,0.15)',  border: 'rgba(6,182,212,0.4)'  },
                    ].map((item) => (
                        <Typography
                        key={item.label}
                       
                        sx={{
                            borderRadius: '6px',
                            fontSize: '12px',
                            px: 1.5,
                            py: 0.5,
                            textTransform: 'none',
                            backgroundImage: 'none',
                            color:item.color,
                            bgcolor:item.bg,
                            border:'solid 1px'
                        }}
                        >
                        {item.label}
                        </Typography>
                    ))}
                    </Stack>
                     <Typography
                     sx={{
                        color:'text.disabled'
                     }}>
                        {new Date(workspace._creationTime).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                     </Typography>
                     <Link href={`/${workspace._id}`}>
                         <IconButton
                          sx={{
                            backgroundImage:'none',
                                position:'absolute',
                                right:20,
                                bottom:20,
                                color:'#02407d70',
                                fontSize:'15px',
                                fontWeight:600,
                                ":hover":{
                                    background:'none'
                                },
                                display:workspace._id===id?'':'none'                
                          }}>
                            open 
                             <ArrowForwardIosOutlinedIcon
                               sx={{
                                fontSize:'10px'
                               }}/>                          
                         </IconButton>                     
                     </Link>

                  </Card>
                </Grid>)  }      
      </Grid>

        
    </Box>)
}