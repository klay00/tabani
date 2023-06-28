import { Box, Stack } from "@mui/system";
import React from "react";
import NavBar from "../components/navbar";
import '../App.css';
import { Button, ThemeProvider } from "@mui/material";
import theme from "../tools/theem";

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
                    marginTop={10}
                    height={'75vh'}
                    spacing={10}
                >
                    <Box
                        flex={1}
                    >
                        <h1
                            style={{ fontSize: 45, fontWeight: 'bold' }}

                        >
                            Welcome  to
                            <span style={{ color: '#FFA800', marginRight: 10, marginLeft: 10 }}>tabani</span>
                            when you can get
                            <div className="pet-title-img"></div>
                            your new best friend</h1>
                        <p>Choose a pet from among the animal classes and contact the owner to reach an adoption agreement</p>
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" sx={{ width: 250, height: 50 }}>GET STARTED</Button>
                        </ThemeProvider>
                    </Box>



                    <Box
                        flex={1}
                        sx={{ position: 'relative' }}
                    >
                        <div className="main-images-title first-img"></div>
                        <div className="main-images-title secndy-img"></div>
                        <div className="main-images-title therrd-img"></div>
                        <div className="main-images-title fiefth-img"></div>
                    </Box>
                </Stack>
            </Box>
        </>
    );
}