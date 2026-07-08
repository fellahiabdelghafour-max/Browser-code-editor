'use client'
import { Box, Button, Card, IconButton, Stack } from "@mui/material";
import CodeSharpIcon from '@mui/icons-material/CodeSharp';
import ModeButton from "../ModeButton/modeButton";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { useThemeModeContext } from "../../context/Theme&Toast";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';


export default  function NavBar({back}:{back:string}){
      const {data}=authClient.useSession();
      const {setOpenDrawer}=useThemeModeContext();
      const router=useRouter()
      function SignOut(){
        authClient.signOut({});
         router.push('/')
      }
return (
    <Box sx={{
        width: 'auto',
        minHeight: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: {sm:'center',md:'space-between'},
        zIndex: 1,
        bgcolor: 'background.default',
        px: { xs: 1, md: 2 },
        borderBottom: 'solid 1px #34305642',
        gap:'10px'
    }}>

        <Stack direction='row' spacing={1} >
            <IconButton
                sx={{
                    backgroundImage: 'none',
                    display: { xs: 'none',sm:'none', md: 'flex',lg:'none' },
                }}
                onClick={() => setOpenDrawer(true)}>
                <MenuOpenIcon />
            </IconButton>

            <Button
                onClick={() => router.push(back)}
                sx={{
                    backgroundImage: 'none',
                    border: 'solid 1px #00094c',
                    bgcolor: 'background.secondary',
                    display: { xs: 'none', sm: 'flex' },
                    fontSize: { md: '12px', lg: '14px' },
                }}>
                {'<'} Back
            </Button>

            <IconButton sx={{ fontSize: { xs: '18px', md: '22px' },display: { xs: 'none', sm: 'flex' } }}>
                <CodeSharpIcon  />
            </IconButton>
        </Stack>

        <Stack direction='row' spacing={{ xs: 0.5, md: 1 }} >
            <ModeButton />

            <Card sx={{
                p: { xs: 0.5, md: 1 },
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: '23px',
                border: '0.1px solid rgba(49, 31, 155, 0.52)',
                gap: 0.5,
            }}>
                <IconButton sx={{
                    borderRadius: '40px',
                    width: '28px',
                    height: '28px',
                    bgcolor: 'rgba(99,102,241,0.2)',
                    fontSize: '12px',
                }}>
                    {data?.user.name?.[0]?.toUpperCase() ?? 'U'}
                </IconButton>

                <Box sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '13px', pr: 1 }}>
                    {data?.user.name ?? 'userName'}
                </Box>
            </Card>

            <Button
                onClick={SignOut}
                sx={{
                    backgroundImage: 'none',
                    border: 'solid 1px #00094c',
                    bgcolor: 'background.secondary',
                    fontSize: { xs: '11px', md: '14px' },
                    px: { xs: 1, md: 2 },
                    minWidth: 'unset',
                }}>
                <Box>Sign Out</Box>
            </Button>
        </Stack>
    </Box>
);
}