import React from 'react';
import '../App.css';
import OverflowCard from './cart';

export default function MainDisplay() {
    return(
        <>
        <div className="main">
            <div className="first"></div>
            <div className="secnde"></div>
            <div className="main-display-items">
            <OverflowCard/>
            <OverflowCard/>
            <OverflowCard/>
            <OverflowCard/>
            <OverflowCard/>
            <OverflowCard/>
            <OverflowCard/>
            <OverflowCard/>
            </div>
        </div>
        </>
    )
}