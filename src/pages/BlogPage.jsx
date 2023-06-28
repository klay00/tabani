import { Box, Stack } from "@mui/system";
import React from "react";
import NavBar from "../components/navbar";
import '../App.css';
import { Button, Divider, ThemeProvider, Typography } from "@mui/material";
import theme from "../tools/theem";
import { Link } from "react-router-dom";
import HouseboatIcon from '@mui/icons-material/Houseboat';
import PetsIcon from '@mui/icons-material/Pets';



export default function BlogPage() {
    return (
        <>
            <NavBar />

            <Box
                marginLeft={{
                    xs: 2,
                    sm: 5,
                    md: 10,
                    lg: 20
                }}
                marginRight={{
                    xs: 2,
                    sm: 5,
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
                    marginTop={3}
                    height={{

                        md: '80vh',
                        lg: '80vh',
                        sm: '100vh',
                        xs: '100vh',
                    }}
                    gap={5}

                >
                    <Box
                        flex={1}


                        sx={{ display: 'flex', flexDirection: 'column', justifyContent: { sm: 'space-between', xs: 'none' } }}
                    >
                        <div>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "35px",
                                        sm: "55px",
                                        md: "65px",
                                        lg: "75px",
                                    },
                                    fontWeight: 'bold'
                                }}
                                variant="h1" gutterBottom>

                                Welcome  </Typography>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "35px",
                                        sm: "55px",
                                        md: "65px",
                                        lg: "75px",
                                    },
                                    fontWeight: 'bold',
                                    marginBottom: 0,
                                }}
                                variant="h1" gutterBottom>
                                to
                                <span style={{ color: '#FFA800', marginRight: 10, marginLeft: 10 }}>tabani</span>
                                when you can get your new best friend
                            </Typography>

                        </div>

                        <p>Choose a pet from among the animal classes and contact the owner to reach an adoption agreement</p>
                        <ThemeProvider theme={theme}>
                            <Link to={'/'}>
                                <Button variant="contained" sx={{ width: 250, height: 54, borderRadius: 3 }}>GET STARTED</Button>
                            </Link>
                        </ThemeProvider>
                    </Box>



                    <Box
                        flex={
                            {
                                xs: 2,
                                sm: 1
                            }
                        }
                        sx={{ position: 'relative' }}

                    >
                        <div className="main-images-title first-img"></div>
                    </Box>
                </Stack>
                <Divider sx={{ marginY: 5 }} />
                <Stack
                    direction={{
                        xs: 'column',
                        sm: 'row',
                        mdl: 'row',
                        lg: 'row',
                    }}
                    sx={{
                        height: {
                            lg: '30vh',
                            md: '40vh',
                            sm: '100%',
                            xs: '100%'
                        },
                        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                        borderRadius: 5,
                        padding: 5,
                        gap: 5
                    }}
                >
                    <Box
                        flex={1}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Stack direction={'row'} alignItems={'center'} spacing={3}>
                            <HouseboatIcon sx={{ color: '#ffc371', backgroundColor: 'white', borderRadius: 4, width: 50, height: 30 }} /><h3> Provide a balanced diet</h3>
                        </Stack>
                        <p> Provide a balanced diet: Ensure your pet receives a nutritionally balanced diet suitable for its species and age. </p>
                    </Box>
                    <Box
                        flex={1}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Stack direction={'row'} alignItems={'center'} spacing={3}>
                            <PetsIcon sx={{ color: '#ff5f6d', backgroundColor: 'white', borderRadius: 4, width: 50, height: 30 }} /><h3> Regular exercise</h3>
                        </Stack>
                        <p> Engage your pet in physical activities and mental exercises to keep them active and entertained. Dogs may require daily walks or playtime in a secure area, </p>
                    </Box>
                    <Box
                        flex={1}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <h1>A pet or companion animal is an animal kept primarily</h1>
                    </Box>
                </Stack>


                <Stack
                    height={'70vh'}
                >

                </Stack>
            </Box>
        </>
    );
}