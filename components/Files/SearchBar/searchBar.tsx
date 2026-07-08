import { InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


interface searchProps{
    setsearchValue:(searchValue:string)=>void;
    searchValue:string
}
export default function SearchBar({searchValue,setsearchValue}:searchProps){
        
            return(
                      <OutlinedInput
                          value={searchValue}
                          onChange={(e) => setsearchValue(e.target.value)}
                          placeholder="Search files..."
                          sx={{
                              height: '40px',
                              width: '97%',
                              borderRadius: '10px',
                              bgcolor: 'background.paper',
                              '& fieldset': {
                                  borderColor: 'rgba(124, 58, 237, 0.25)',
                              },
                              '&:hover fieldset': {
                                  borderColor: 'rgba(59, 130, 246, 0.5) !important',
                              },
                              '&.Mui-focused fieldset': {
                                  borderColor: '#7c3aed !important',
                                  borderWidth: '1px !important',
                              },
                              fontSize: '14px',
                          }}
                          startAdornment={
                              <InputAdornment position="start">
                                  <SearchIcon sx={{ color: 'text.disabled', fontSize: '18px' }} />
                              </InputAdornment>
                          }
                      />)
}