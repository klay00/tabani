import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import {ThemeProvider } from '@mui/material';
import theme from '../tools/theem';
import InfoIcon from '@mui/icons-material/Info';
import ImageIcon from '@mui/icons-material/Image';
import PersonIcon from '@mui/icons-material/Person';
import DialogEdit from './DilogEdit';

export default function EditProfile({userId}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Button
                    variant='outlined'
                    sx={{ pl: 1, pr: 1, width: 60 }}
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <EditIcon />
                </Button>
            </ThemeProvider>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <DialogEdit name={'Edit photo'} icon={<ImageIcon/>} userId={userId}/>
                <DialogEdit  name={'Edit Name'}icon={<PersonIcon/>} userId={userId}/>
                <DialogEdit  name={'Add Discraption'}icon={<InfoIcon/>}userId={userId}/>
                
            </Menu>
        </div>
    );
}