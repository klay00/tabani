import React from 'react';
import '../App.css';
import MainButtom from './buttom';
import OverflowCard from './cart';
import Search from './serch';


export default function MainDisplay() {
    return(
        <>
        <div className="main">
            <div className="first">
                <Search/>
            </div>
            <div className="secnde">
                <MainButtom name={'hussein'}/>
            </div>
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