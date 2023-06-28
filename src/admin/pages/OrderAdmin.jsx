import { Box } from "@mui/system";
import SideBar from "../components/SideBar";
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../../App.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, getDocs, doc, deleteDoc} from 'firebase/firestore';
import Slide from '@mui/material/Slide';
import { auth, db } from "../../firebase/firebase";
import Loding from "../../components/loading";

export const rows1 = [];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderAdmin() {

    const [orderPetDataI, setOrderPetData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                fetchOrderData();
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const fetchOrderData = async () => {
        const petQuerySnapshot = await getDocs(collection(db, 'order'));
        const orderPetData = petQuerySnapshot.docs
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        setOrderPetData(orderPetData);
        setLoading(false);
    };

    useEffect(() => {
        if (orderPetDataI.length === 0 && !loading) {
            fetchOrderData();
        }
    }, [orderPetDataI, loading]);

    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState([]);

    const handleClickOpen = (order) => {
        setOrder(null)
        setOrder(order)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const columns = [
        { field: 'petName', headerName: 'Pet Name', width: 120 },
        { field: 'fullName', headerName: 'Order Name', width: 120 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'onerPhone', headerName: 'Owner Phone', width: 120 },
        {field: 'status', headerName: 'Order Status', width: 120},
        {field: 'phoneNumber', headerName: 'Order phone ', width: 120},
        {
            field: 'care', headerName: 'Order Care Message', width: 150,
            renderCell:(params)=>
            <>
                
                    <Button onClick={(() => handleClickOpen(params.row))}>
                        {params.value}
                    </Button>           

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"

                >
                    <DialogTitle>{"Care"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" >
                            {order.placement}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>                       
                                <Button variant="contained"
                                    color="secondary"
                                    sx={{ borderRadius: 10 }}
                                    onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </>    
    },
        {
            field: 'placement', headerName: 'Order placement ', width: 150,renderCell: (params) =>
            <>
                
                    <Button onClick={(() => handleClickOpen(params.row))}>
                        {params.value}
                    </Button>           

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"

                >
                    <DialogTitle>{"Placement"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" >
                            {order.placement}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                       
                                <Button variant="contained"
                                    color="secondary"
                                    sx={{ borderRadius: 10 }}
                                    onClick={handleClose}>Close</Button>

                    </DialogActions>
                </Dialog>
            </>

    
    },

        {
            field: 'delet', headerName: 'Delete User', width: 100,
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
            await deleteDoc(doc(db, 'order', documentId));
            console.log('Document deleted successfully');
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    async function handeldelet(order) {
        setLoading(true);
        try {
  
            await deleteDocument(order.id);           
            setLoading(false);
            window.location.reload();
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
                <h2>Orders</h2>
                <Box className={"tbale-dash-user"} sx={{ height: '78vh', width: '100%' }}>
                    {!loading ? (
                        <>
                            <DataGrid rows={orderPetDataI} columns={columns} />

                        </>
                    ) : (
                        <Loding name={'reload'} />
                    )}
                </Box>
            </Box>
        </>
    )
}




