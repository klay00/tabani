import React from "react";
import OverflowCard from "../components/cart";
import NavBar from "../components/navbar";

export default function AllProduct() {
    return (
        <>       
        <NavBar/>
        <div>
        <OverflowCard/><OverflowCard/><OverflowCard/><OverflowCard/><OverflowCard/><OverflowCard/><OverflowCard/><OverflowCard/><OverflowCard/><OverflowCard/>
        </div>

            All product
        </>
    );
}