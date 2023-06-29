import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import theme from '../tools/theem';
import { ThemeProvider } from '@mui/system';
import { collection, doc, updateDoc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import React, { useState } from 'react';
import '../App.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotificationMessage({ data }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handelDismiss = async () => {
        try {
            await updateDoc(doc(db, "notif", data.id), {
                status: false
            });
            console.log('change status seccess');
            handleClose()
        } catch (e) {
            console.log(e);
        }

    };
    const [copied, setCopied] = useState(false);

    const handleCopy = (phoneNumber) => {


        if (phoneNumber.startsWith('0') && phoneNumber.length >= 11) {
            const num = phoneNumber.substring(1);

             const whatsappUrl = `https://wa.me/${num}`;
            // // Open WhatsApp in a new window or tab
             window.open(whatsappUrl);
        }

    };
    return (
        <div>
            <ThemeProvider theme={theme}>
                <div >

                    <Button onClick={handleClickOpen}>
                        Pet request accepted {data.petName}
                    </Button>
                </div>

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Your Adopte Pet hase ben accepted"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                           <h3 color='secondary'> 
                           thanke you to adobt
                            
                              <span style={{paddingLeft:8,paddingRight:8 ,color:'red'}}>{data.petName}</span>  
                           
                            this my phone number to contact with me to get the pet 
                            </h3>
                            <h3>Click the number to open in WhatsApp</h3>
                            <h3 onClick={() => handleCopy(data.onerPhone)} style={{ cursor: 'pointer', color: "#FFA800" }} >
                                {data.onerPhone}
                            </h3>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handelDismiss}>Dismiss</Button>
                    </DialogActions>
                </Dialog>

            </ThemeProvider>
        </div>
    );
}