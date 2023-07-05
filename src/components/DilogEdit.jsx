import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';
import theme from '../tools/theem';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/firebase';
import Lodaer from './loader';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function DialogEdit({ name, icon, userId }) {
    const [open, setOpen] = useState(false);
    const [loding, setLoding] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (event) => {
        setLoding(true)
        event.preventDefault();

        if (selectedFile) {
            try {
                const storageRef = ref(storage, `images/${userId}/image.jpg`);
                await uploadBytes(storageRef, selectedFile);

                const downloadURL = await getDownloadURL(storageRef);

                const userDocRef = doc(db, 'users', userId);
                await setDoc(userDocRef, {
                    profileImage: downloadURL, 
                }, { merge: true });
                setLoding(false)
                window.location.href = '/';
                console.log('Image uploaded and URL stored successfully.');
            } catch (error) {
                setLoding(false)
                console.error('Error uploading image and storing URL:', error);
            }
        }
        
    };
    const handelSubmitDiscrption = async (event) => {
        event.preventDefault();
        setLoding(true)
        try {
            const value = event.target.elements['outlined-multiline-static'].value;
            const userDocRef = doc(db, 'users', userId);
            await setDoc(userDocRef, {
                discreption: value,
            }, { merge: true });
           window.location.href = '/'; 
        } catch (e) {
         }
        setLoding(false)
        
    }
    const handelSubmitName = async (event) => {
        event.preventDefault();
        setLoding(true)
        const value = event.target.elements['outlined-multiline-static'].value;
        try {
            const documentRef = doc(db, 'users',userId );
            const updatedData = {
                fullName: value
            };
            await updateDoc(documentRef, updatedData);
            console.log('Document updated successfully!'); 
            window.location.href = '/';
        } catch (e) {
         }

        setLoding(false)
       
    }
    return (
        <div>
            <Button color='inherit' onClick={handleClickOpen} sx={{ width: '100%', justifyContent: 'flex-start' }}>
                <Stack spacing={2} direction={'row'} justifyContent={'flex-start'}>
                    <span>{icon}</span>
                    <span>{name}</span>
                </Stack>
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {name}
                </BootstrapDialogTitle>
                <DialogContent dividers sx={{
                    width: {
                        xs: 300,
                        sm: 400,
                        lg: 500,
                    },
                }}>
                    {name === 'Edit photo' && (
                        <Typography gutterBottom sx={{ padding: 5 }}>
                            <Stack justifyContent={'center'} alignItems={'center'} direction={'column'} spacing={3}>
                                <Avatar src={previewImage || selectedFile} sx={{ width: 150, height: 150 }} />

                                <Box>
                                    <form onSubmit={handleSubmit}>

                                        <label htmlFor="photo">
                                            <Stack sx={{ border: 'dotted', borderColor: 'blue', cursor: 'pointer', width: "100%", mb: 3 }} fullWidth alignItems={'center'} justifyContent={'center'}>
                                                <PhotoSizeSelectActualTwoToneIcon sx={{ width: 50, height: 50, ml: 13, mr: 13, mb: 3 }} fullWidth color="primary" />
                                                <h5>Choose image</h5>
                                            </Stack>
                                        </label>
                                        <input type="file" id="photo" onChange={handleFileChange} style={{ display: 'none' }} required/>
                                        <ThemeProvider theme={theme}>
                                            <div >
                                                <Button variant='contained'
                                                    sx={{ width: 130, borderRadius: 20 }}
                                                    type="submit">
                                                    {
                                                        loding ? <Lodaer /> : "Add Image"
                                                    }
                                                </Button>
                                            </div>
                                        </ThemeProvider>


                                    </form>
                                </Box>
                            </Stack>
                        </Typography>
                    )}
                    {name === 'Edit Name' &&
                        <Typography gutterBottom>
                            <Typography gutterBottom >

                                <form onSubmit={handelSubmitName}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Add Now Name"
                                        multiline
                                        fullWidth
                                        sx={{ mb: 3 }}
                                        required
                                    />
                                    <ThemeProvider theme={theme}>
                                        <div >
                                            <Button variant='contained'
                                                sx={{ width: 130, borderRadius: 20 }}
                                                type="submit">
                                                {
                                                    loding ? <Lodaer /> : "Add Name"
                                                }
                                            </Button>
                                        </div>
                                    </ThemeProvider>
                                </form>
                            </Typography>
                        </Typography>

                    }
                    {name === 'Add Discraption' &&
                        <Typography gutterBottom >

                            <form onSubmit={handelSubmitDiscrption}>
                                <TextField
                                    required
                                    id="outlined-multiline-static"
                                    label="Discrption"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    sx={{ mb: 3 }}
                                />
                                <ThemeProvider theme={theme}>
                                    <div >
                                        <Button variant='contained'
                                            sx={{ width: 130, borderRadius: 20 }}
                                            type="submit">
                                            {
                                                loding ? <Lodaer /> : "Discrption"
                                            }
                                        </Button>
                                    </div>
                                </ThemeProvider>
                            </form>
                        </Typography>
                    }
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}
