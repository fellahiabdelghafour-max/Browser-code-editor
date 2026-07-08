'use client'
import { Box,Drawer,IconButton,Stack } from "@mui/material";
import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import AlertDialogSlide from "../dialog/dialog";
import { useFileBodyContext } from "../../context/FilesContext";
import { useThemeModeContext } from "../../context/Theme&Toast";
import FilesField from "./FilesField/FilesField";
import NewFile from "./NewFile/newFile";
import SearchBar from "./SearchBar/searchBar";
import AddingButton from "./AddingButton/addingButton";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import NaviagteFiles from "./NavigateFiles/navigateFiles";
export default function Files({ id }: { id:Id<'WorkSpace'> }) {

const Files=useQuery(api.workSpace.getFilesByWorkSpaceId,{ workSpaceId: id })
const createFileMutation=useMutation(api.workSpace.createFile);
function CreateFile(FileName:string,type:string){
  createFileMutation({type:type,Name:FileName,workSpaceId:id, body: ''})
}
   const [FileType,setFileType]=useState<string>('All');
   const [searchValue,setsearchValue]=useState<string>('');
   const [EditedFile,setEditedFile]=useState<Id<'Files'>|null>(null);
   const {handleToast,setOpen,openDrawer,setOpenDrawer}=useThemeModeContext();

  const FilterFiles=FileType==='All'
  ?Files?.filter((file)=> file.Name.includes(searchValue))
  :FileType==='HTML'
  ?Files?.filter((file)=>(/^.*\.html$/).test(file.Name) && file.Name.includes(searchValue))
  :FileType==='CSS'
  ?Files?.filter((file)=>(/^.*\.css$/).test(file.Name)&& file.Name.includes(searchValue))
  :FileType==='JS'
  ?Files?.filter((file)=>(/^.*\.js$/).test(file.Name)&& file.Name.includes(searchValue))
  :null;
   const [sellectedFile,setSellectedFile]=useState<Id<"Files"> | string>(Files?Files[0]?._id:'');
   const [showAddingField,setShowAddingField]=useState<boolean>(false);
   const [showButtons,setShowButtons]=useState<string>('');
   const [FileName,setFileName]=useState<string>('');
   const [FileId,setFileId]=useState<Id<'Files'>>()
   const [openD,setOpenD]=useState(false);
   const context=useFileBodyContext();
     const setFile=context?.setFileId;

   const deleteFileMutation=useMutation(api.workSpace.deleteFile);
    function DeleteFile(FileId:{FileId:Id<'Files'>}){
      try{
        deleteFileMutation(FileId)
        handleToast?.('Delete File Successfully','success')
      }
        catch{
          handleToast?.('Error check your internet','error')
        }
       setOpen(true)
    }

  const updateFileName=useMutation(api.workSpace.updateFileName);
  function UpdateFileName(){
  try{
    if (EditedFile && FileName) {
      updateFileName({ FileId: EditedFile, FileName })
      setEditedFile(null)
      setFileName('')    
  }
    handleToast?.('Updated Successfully','success')
   }
   catch{
    handleToast?.('Error check your internet','error')
   }
   setOpen(true)
  }



     
     const FilesComponent= <Box
        sx={{ 
            height: "100%"
            ,bgcolor: 'background.secondary'
            ,width:{sm:'100vw',xs:'100vw',md:'100%',lg:'100%'}
      
         }}    >
          {
            AlertDialogSlide(
              `"${FileName}" will be permanently removed.`,
              openD,
              setOpenD,
              () => {
                if (FileId) DeleteFile({ FileId })
              }

            )
          }


            <AddingButton
             setShowAddingField={setShowAddingField}
             />
            
            <Stack
              sx={{
                borderBottom:'rgba(99,102,241,0.18) solid 0.1px',
              }}>

                    <SearchBar
                    searchValue={searchValue}
                    setsearchValue={setsearchValue}
                    />
                    
                    <NaviagteFiles
                      setFileType={setFileType}
                      FileType={FileType}/>
            </Stack>


          <FilesField
             setEditedFile={setEditedFile}
             setFileName={setFileName}
             setShowButtons={setShowButtons}
             setSellectedFile={setSellectedFile}
             setFileId={setFileId}
             setOpenD={setOpenD}
             FilterFiles={FilterFiles}
             showButtons={showButtons}
             EditedFile={EditedFile}
             sellectedFile={sellectedFile}
             UpdateFileName={UpdateFileName}
             setFile={setFile}
           /> 


           <NewFile
                          showAddingField={showAddingField}
                          FileName={FileName}
                          CreateFile={CreateFile}
                          setFileName={setFileName}
                          setShowAddingField={setShowAddingField}
           />

        </Box>
    return (<>
    <Box sx={{display:{xs:'block',sm:'block',md:'none',lg:'block'},height:'100%'}}>
      {FilesComponent}
    </Box>


            <Stack sx={{display:{xs:'none',sm:'none',md:'flex',lg:'none'},zIndex:1,position:'fixed',height:'100%'}}> 

        <Drawer
        onClose={()=>{setOpenDrawer(false)}}
         open={openDrawer} sx={{display:{xs:'none',sm:'none',md:'flex',lg:'none'},zIndex:1,position:'fixed',height:'100%'}}>
          <IconButton
            sx={{
              backgroundImage:'none'
            }}
            onClick={()=>{
              setOpenDrawer(false)
            }}>
            <CloseFullscreenIcon/>            
          </IconButton>

            {FilesComponent}
           
        </Drawer>
        </Stack>
      

       </>
    )
}
