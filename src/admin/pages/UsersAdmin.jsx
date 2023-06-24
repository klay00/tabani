import { Box } from "@mui/system";
import SideBar from "../components/SideBar";
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../../App.css';
import { Alert, AlertTitle, Avatar, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import Slide from '@mui/material/Slide';
import { auth, db, storage } from "../../firebase/firebase";
import Loding from "../../components/loading";
import Dialog from '@mui/material/Dialog';

export const rows1 = [];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserAdmin() {

    const [petDataI, setPetData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                console.log(authUser.uid);
                fetchPetData();
                fetchOrder();
            } else {
                console.log('xxxxxxxxxxxx');
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const fetchPetData = async () => {

        const petQuerySnapshot = await getDocs(collection(db, 'users'));
        const petData = petQuerySnapshot.docs
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        setPetData(petData);
        setLoading(false);
    };

    useEffect(() => {
        if (petDataI.length === 0 && !loading) {
            fetchPetData();
            fetchOrder();
        }
    }, [petDataI, loading]);

    const [petOrderData, setOrderData] = useState([])
    const fetchOrder = async () => {
        const q = await getDocs(collection(db, 'order'));
        const orderData = q.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        setOrderData(orderData);
    }
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleClickOpen = (data) => {
        setUser(null)
        setUser(data)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChangeStatus = async (user) => {
        console.log(user);

        setLoading(true);
        if (user.status === 'user') {
            try {

                const documentRef = doc(db, 'users', user.id);
                const updatedData = {
                    status: 'Admin'
                };
                await updateDoc(documentRef, updatedData);
                window.location.reload();
                setSuccessMessage('User hase been upgraded to Admin');
                setTimeout(() => {
                    setSuccessMessage('')
                }, 5000);
                setLoading(false);
            } catch (e) {
                setSuccessMessage('error with upgraded  User to Admin');
                setTimeout(() => {
                    setSuccessMessage('')
                }, 5000);
            }
        } else {
            try {

                const documentRef = doc(db, 'users', user.id);
                const updatedData = {
                    status: 'user'
                };
                await updateDoc(documentRef, updatedData);
                window.location.reload();
                setLoading(false);
                setSuccessMessage('Admin hase been return to User');
                setTimeout(() => {
                    setSuccessMessage('')
                }, 5000);
            } catch (e) {
                setErrorMessage('error with return  Admin to user');
                setTimeout(() => {
                    setErrorMessage('')
                }, 5000);
            }
        }


    }
    const columns = [
        { field: 'profileImage', headerName: 'Image', width: 100, renderCell: (params) => <Avatar src={params.value} /> },
        { field: 'fullName', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 240 },
        { field: 'location', headerName: 'Location', width: 140 },
        {
            field: 'status', headerName: 'The Status', width: 100,
            renderCell: (params) =>
                <>{
                    params.value === "Admin" ?

                        <Button onClick={(() => handleClickOpen(params.row))}>
                            {params.value}
                        </Button>
                        :
                        <Button onClick={(() => handleClickOpen(params.row))}>
                            {params.value}
                        </Button>
                }

                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"

                    >
                        <DialogTitle>{"User Status"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description" >
                                {
                                    user.status === "Admin" ?
                                        <>
                                            <h3>Return the admin to a user</h3>
                                            {user.fullName}
                                        </> :
                                        <>
                                            <h3>Promote the user to an admin</h3>
                                            {user.fullName}
                                        </>
                                }
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {
                                user.status === "Admin" ?
                                    <Button variant="contained"
                                        color="secondary"
                                        sx={{ borderRadius: 10 }}
                                        onClick={(() => handleChangeStatus(user))}>Return to user</Button>
                                    :

                                    <Button variant="contained"
                                        color="success"
                                        sx={{ borderRadius: 10 }}
                                        onClick={(() => handleChangeStatus(user))}>Make it Admin</Button>
                            }
                        </DialogActions>
                    </Dialog>
                </>

        },
        {
            field: 'delet', headerName: 'Delete User', width: 120,
            renderCell: (params) =>
                <>
                    {
                        loading ? <Loding /> :
                            <IconButton onClick={() => handeldelet(params.row)} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                    }

                </>

        },
    ];


    //delet  pet 
    const deleteDocument = async (documentId) => {
        try {
            await deleteDoc(doc(db, 'users', documentId));
            console.log('Document deleted successfully');
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    //delete image pet
    const deleteImages = async (imageUrls) => {
        try {

            const imageUrl = decodeURIComponent(imageUrls); // Decode the URL if necessary
            const imageRef = ref(storage, `images/${imageUrl}/image.jpg`);
            return deleteObject(imageRef);

            await Promise.all(imageUrl);
            console.log('Images deleted successfully');
        } catch (error) {
            console.error('Error deleting images:', error);
        }
    };
    const [userPetData, setUsePetData] = useState([]);
    async function handelPetDelet(petdata) {
        setLoading(true);
        try {
            petdata.map(async (pet, i) => {
                await deletePetImages(pet.images);
                await deletePetDocument(pet.id);

            })

            setLoading(false);
            alert('delete pet sucsess')
        } catch (error) {
            setLoading(false);

            console.error('Error deleting pet:', error);
            // Handle error and display an error alert if necessary
        }
    }
    const deletePetDocument = async (documentId) => {
        try {
            await deleteDoc(doc(db, 'pets', documentId));
            console.log('Document deleted successfully');
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };
    const deletePetImages = async (imageUrls) => {
        try {
            const promises = imageUrls.map((url) => {
                const imageUrl = decodeURIComponent(url);
                const imageRef = ref(storage, imageUrl);
                return deleteObject(imageRef);
            });
            await Promise.all(promises);
            console.log('Images deleted successfully');
        } catch (error) {
            console.error('Error deleting images:', error);
        }
    };
    const featchPetUser = async (id) => {

        const q = await getDocs(collection(db, 'pets'));
        const petData = q.docs
            .filter((doc) => doc.data().userId === id)

            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        setUsePetData(petData);
        handelPetDelet(petData)
    }

    async function handeldelet(user) {
        setLoading(true);
        try {

            await featchPetUser(user.id)
            if (user.profileImage) {
                await deleteImages(user.id);
            }


            await deleteDocument(user.id);

            setLoading(false);
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } catch (error) {
            setLoading(false);

            console.error('Error deleting pet:', error);

        }
    }
    return (
        <>
            <SideBar />

            <Box
                sx={{
                    marginLeft: 10,
                    marginTop: 5,
                    marginRight: 3,
                }}
            >
                {successMessage && (
                    <Alert severity="success" sx={{ position: 'fixed', top: 40, right: '50%', transform: "translatex(50% )", width: '300px', zIndex: 9999 }}>
                        <AlertTitle>Success</AlertTitle>
                        <div>{successMessage}</div>
                    </Alert>
                )}

                {errorMessage && (
                    <Alert severity="error" sx={{ position: 'fixed', top: 40, right: '50%', transform: "translatex(50% )", width: '300px', zIndex: 9999 }}>
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage}
                    </Alert>
                )}
                <h2>Users</h2>
                <Box className={"tbale-dash-user"} sx={{ height: '78vh', width: '100%' }}>
                    {!loading ? (
                        <>
                            <DataGrid rows={petDataI} columns={columns} />

                        </>
                    ) : (
                        <Loding name={'reload'} />
                    )}
                </Box>
            </Box>
        </>
    )
}




