import { ConvexClientProvider } from "@/app/ConvexClientProvider";
import ThemeModeProvider from "../../../../context/Theme&Toast";
import { ReactNode } from "react";
import AppThemeProvider from "../../../../theme/theme";
import { Box } from "@mui/material";

export default function LayoutEditor({children}:{children:ReactNode}){

     return(
        <html>
     <body style={{margin:0}}>
        
        <ThemeModeProvider>
        <AppThemeProvider>
            
        <Box>
            <ConvexClientProvider>
                 {children}
            </ConvexClientProvider>            
        </Box>

         </AppThemeProvider>         
        </ThemeModeProvider>
      </body>             
        </html>

     )
}