import { Button, ThemeProvider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/navbar";
import "../tools/nopagecss.css";
import theme from "../tools/theem";

export default function NoPage() {
    return (
        <>
            <NavBar />


            <section class="page_404">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 ">
                            <div class="col-sm-10 col-sm-offset-1  text-center">
                                <div class="four_zero_four_bg">
                                    <h1 class="text-center ">404</h1>


                                </div>

                                <div class="contant_box_404">
                                    <h3 class="h2">
                                        Look like you're lost
                                    </h3>

                                    <p>the page you are looking for not avaible!</p>
                                    <Link to={'/'}>
                                        <ThemeProvider theme={theme}>
                                            <Button variant="contained" sx={{ borderRadius: 20 }}>Go to Home</Button>
                                        </ThemeProvider>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </>
    );
}