import React from "react";
import Button from '@mui/material/Button';
import NavBar from "../components/navbar";


export default function HomePage() {
    return (
        <>
         <NavBar/>
        <Button variant="contained" color="success">
            Success
        </Button>
     
        </>
    );
}