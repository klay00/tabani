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
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(phoneNumber)
              .then(() => {
                setCopied(true);
              })
              .catch((error) => {
                console.log('Copy failed:', error);
              });
          } else {
            // Fallback for browsers that do not support clipboard API
            const textField = document.createElement('textarea');
            textField.innerText = phoneNumber;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand('copy');
            textField.remove();
            setCopied(true);
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
                    <DialogTitle>{"Your Adopte Pet hase ben accebtrd"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            thanke you to adobt
                            <h3 color='secondary'>
                                {data.petName}
                            </h3>
                            this my phone number to contact with me to get the pet
                            {/* <h3>{data.onerPhone}</h3> */}
                            <h3 onClick={() => handleCopy(data.onerPhone)} style={{ cursor: 'pointer', color: "#FFA800" }} >
                                {data.onerPhone}
                            </h3>
                            {copied && <p style={{ color: "#FFA000" }}>Phone number copied!</p>}
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