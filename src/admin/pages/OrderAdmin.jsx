import { Box } from "@mui/system";
import SideBar from "../components/SideBar";

export default function OrderAdmin() {
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
         <h2>Orders</h2>
        </Box>
        </>
    )
}