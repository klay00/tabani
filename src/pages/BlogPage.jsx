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
                marginBottom={5}
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
                    height={{
                        xs: '100vh',
                        sm: '100vh',
                        md: '80vh',
                        lg: '70vh',
                    }}

                    direction={{
                        xs: 'column',
                        sm: 'column',
                        md: 'row',
                        lg: 'row',
                    }}
                    marginTop={4}
                    gap={5}

                >
                    <Box
                        flex={1}
                        position="relative"
                    >
                        <div className="daopt-image"></div>
                        <div className="daopt-image2"></div>
                    </Box>
                    <Box
                        flex={1}
                    >
                        <h2>Essential Pet Care Responsibilities</h2>
                        <ul className="pet-cart">
                            <li>Feeding and Hydration: Provide regular meals and fresh water. </li>

                            <li>Exercise and Stimulation: Engage in play and provide mental stimulation. </li>

                            <li>Grooming and Hygiene: Maintain cleanliness and perform necessary grooming.  </li>

                            <li>Veterinary Care and Vaccinations: Schedule regular check-ups and vaccinations. </li>

                            <li>Safe and Comfortable Environment: Create a secure and comfortable living space.</li>

                        </ul>
                    </Box>
                </Stack>
                <Stack
                    height={'100%'}
                    marginTop={4}
                    gap={5}
                >
                    <Stack
                        direction={{
                            xs: 'column',
                            sm: 'row',
                            mdl: 'row',
                            lg: 'row',
                        }}
                        sx={{
                            height: {
                                md: '40vh',
                                sm: '50vh',
                                xs: '50vh'
                            },
                            padding: 5,
                            gap: 5,
                            background: "linear-gradient(to right, #e9bdc18a, #ffc37161)",
                            borderRadius: 5,
                        }}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Typography
                            sx={{
                                fontSize: '30px',
                                fontWeight: 'bold',
                                marginBottom: 0,
                            }}
                            variant="h1" gutterBottom>
                            What does
                            <span style={{ color: '#FFA800', marginRight: 10, marginLeft: 10 }}>tabani</span>
                            offer you
                        </Typography>
                        <div className="image-dog-tapan-png"></div>
                    </Stack>

                    <Stack
                        direction={{
                            xs: 'column',
                            sm: 'row',
                            mdl: 'row',
                            lg: 'row',
                        }}
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={{
                            height: {
                                md: '60vh',
                                sm: '100%',
                                xs: '100%'
                            },
                            gap: 10
                        }}>
                        <article class="card card-image-pet1">
                            <div class="temporary_text">

                            </div>
                            <div class="card_content">
                                <span class="card_title">Offer for adoption</span>
                                <span class="card_subtitle">If you own a pet and want to put it up for adoption, then tabani is the best fit for you.</span>
                                <p class="card_description">You can offer your pet or if you are no longer able to take care of it in tabani and be one of the many animals available</p>

                            </div>
                        </article>
                        <article class="card card-image-pet2">
                            <div class="temporary_text">

                            </div>
                            <div class="card_content">
                                <span class="card_title">Check out the available pets</span>
                                <span class="card_subtitle">If you are interested in owning an animal,</span>
                                <p class="card_description">  You can see many pets on the platform. Our platform has many animals that you can choose from, The multiplicity of varieties is what distinguishese</p>

                            </div>
                        </article>
                        <article class="card card-image-pet3">
                            <div class="temporary_text">

                            </div>
                            <div class="card_content">
                                <span class="card_title">Apply for adoption</span>
                                <span class="card_subtitle">You can easily adopt the desired animals </span>
                                <p class="card_description">and communicate with the owner to acquire the new friend All you have to do is choose the required animal and fill in the fields with their requirements </p>

                            </div>
                        </article>
                    </Stack>

                </Stack>
            </Box>
            <Box
                sx={{
                    height: {
                        lg: 80,
                        md: 70,
                        sm: 50,
                        xs: 40,
                    },

                    width: '100%',
                    backgroundColor: '#FFA800',
                    borderTopLeftRadius: 70,
                    borderTopRightRadius: 70,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <PetsIcon />
                <h3>tabani</h3>
            </Box>

        </>
    );
}