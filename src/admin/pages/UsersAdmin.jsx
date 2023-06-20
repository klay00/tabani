import { Box } from "@mui/system";
import SideBar from "../components/SideBar";

export default function UserAdmin() {
    return(
        <>
        <SideBar/>
        
        <Box 
        sx={{
            marginLeft: 10,
            marginTop: 5,
            marginRight: 3,
        }}
        >
         <h2>Users</h2>
         
        </Box>
        </>
    )
}