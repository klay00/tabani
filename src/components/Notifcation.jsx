import React, { useEffect, useState } from "react";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Badge, IconButton, ThemeProvider } from "@mui/material";
import theme from "../tools/theem";
import Menu from '@mui/material/Menu';
import NotificationMessage from "./NotificationMessage";
import '../App.css';


export default function Notfcation({data}) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(data.length);
    return (
        <>
            <ThemeProvider theme={theme}>
                <div>
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Badge badgeContent={data.length} color={'red1'} >
                            <CircleNotificationsIcon color={'white1'} />
                        </Badge>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            data.length===0?
                            <>
                            <div className="noNote">
                                <div className="image"></div>
                                <h3 className="text">you haven't note</h3>
                            </div>
                            </>:
                            data.map((data)=>{
                                return(
                                    <>
                                    <NotificationMessage data={data}/>
                                    
                                    </>
                                )
                                
                            })
                        }
                    </Menu>
                </div>
            </ThemeProvider>
        </>
    )
}