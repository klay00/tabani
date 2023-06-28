import { Grid } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import NavBar from "../components/navbar";

export default function BlogPage() {
    return (
        <>
            <NavBar />

            <Box
                marginLeft={{
                    sm: 1,
                    md: 10,
                    lg: 20
                }}
                marginRight={{
                    sm: 2,
                    md: 10,
                    lg: 20
                }}
            >

                <Stack
                    direction={{
                        sm: 'column',
                        md: 'row',
                        lg: 'row',
                    }}
                    justifyContent="space-between"
                >
                    <Box
                    flex={1}
                    >
                        <h1 
                        style={{fontSize:45}}
                        
                        >Welcome  to <span style={{color:'#FFA800'}}>tabani</span>
                         when you can get   
                           
                        your new best friend</h1>
                        
                    </Box>

            

                    <Box
                    flex={1}
                    >dddeeeeeee</Box>
                </Stack>
            </Box>
        </>
    );
}