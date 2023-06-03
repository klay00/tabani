import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../App.css';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PetsIcon from '@mui/icons-material/Pets';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import Loding from './loading';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

function handeldelet(id) {
  console.log(id);
}
export const rows1 = [];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ValueGetterGrid() {
  const [userId1, setUserId] = useState('');
  const [petDataI, setPetData] = useState([]);
  const [loading, setLoading] = useState(true); // Renamed "loding" to "loading"

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        console.log(authUser.uid);
        setUserId(authUser.uid);
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
    const petQuerySnapshot = await getDocs(collection(db, 'pets'));
    const petData = petQuerySnapshot.docs
      .filter((doc) => doc.data().userId === userId1)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    setPetData(petData);
    setLoading(false);
    rows1.push(...petData)
  };

  useEffect(() => {
    if (petDataI.length === 0 && !loading) {
      fetchPetData();
      fetchOrder();

    }
  }, [petDataI, loading]);
  const [petOrderData,setOrderData]=useState([])
const fetchOrder= async()=>{
  const q=await getDocs(collection(db,'order'));
  const orderData=q.docs.map((doc)=>({
    id:doc.id,
    ...doc.data(),
  })) 
  setOrderData(orderData);
}
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
  const columns = [
    { field: 'images', headerName: 'Image', width: 80, renderCell: (params) => <Avatar src={params.value} /> },
    { field: 'fullName', headerName: 'Pet Name', width: 100 },
    { field: 'type', headerName: 'The type', width: 100 },
    { field: 'age', headerName: 'The Age', width: 100 },
    { field: 'sex', headerName: 'The Sex', width: 100 },
    { field: 'size', headerName: 'The size', width: 100 },
    { field: 'avcciation', headerName: 'The vacciation', width: 160 },
    { field: 'status', headerName: 'The Status', width: 170 },
    {
      field: 'order', headerName: 'Pet Order', width: 120,
      renderCell: (params) =>
      petOrderData.some((order) => order.petId === params.row.id) ? (
        <>
        <IconButton onClick={() => handelViewOrder(params.row)} aria-label="order">
          <PetsIcon />
        </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
      <div>{orderPetData.fullName}</div>
      <div>{orderPetData.email}</div>
      dkdkdk
      </Dialog>
        </>
        
      ) : null,
  
    },
    {
      field: 'delet', headerName: 'Delete pet', width: 120,
      renderCell: (params) => 
        <IconButton onClick={() => handeldelet(params.value)} aria-label="delete">
        <DeleteIcon />
      </IconButton>
      
    },
  ];

 const [orderPetData,setOrderPetData]=useState([]);
  function handelViewOrder(params) {
    const matchingOrderData = petOrderData.filter((order) => order.petId === params.id);
    setOrderPetData(matchingOrderData);
    handleClickOpen();
    
  }

  return (
    <Box className={"tbale-dash-user"} sx={{ height: 400, width: '100%' }}>
      {!loading ? (
        <>         
        <DataGrid rows={petDataI} columns={columns} />
        </>
      ) : (
        <Loding name={'reload'}/>
      )}
    </Box>
  );
}
