import { Button } from "@mui/material";
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../tools/theem";

export default function MainButtom({name}) {
    return(
    <>
    <ThemeProvider theme={theme}>
                <Button variant="contained"  color="secondary" size="large" sx={{ fontSize: 'md', pl:5 ,pr:5}}>
                    {name}
                </Button>
            </ThemeProvider>
    </>
    )
}