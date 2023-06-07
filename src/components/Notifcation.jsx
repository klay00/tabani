import React from "react";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Badge, IconButton, ThemeProvider } from "@mui/material";
import theme from "../tools/theem";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Notfcation() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                {/* <Badge badgeContent={4} color={'red1'} >
                    <CircleNotificationsIcon color={'white1'}/>
                </Badge> */}

                <div>

                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Badge badgeContent={4} color={'red1'} >
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
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
            </ThemeProvider>
        </>
    )
}