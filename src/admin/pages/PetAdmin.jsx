import { Box } from "@mui/system";
import SideBar from "../components/SideBar";
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../../App.css';
import { Avatar, Button, ThemeProvider} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PetsIcon from '@mui/icons-material/Pets';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Slide from '@mui/material/Slide';
import { auth, db, storage } from "../../firebase/firebase";
import Loding from "../../components/loading";
import theme from "../../tools/theem";
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import PetDisplayAdmin from "../components/PetDisplayAdmin";

export const rows1 = [];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PetAdmin() {

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

    const petQuerySnapshot = await getDocs(collection(db, 'pets'));
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
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);

  const handleClickOpen = (petdata) => {
    setData(petdata)
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
    { field: 'onerPhone', headerName: 'Phone Number', width: 140 },
    { field: 'avcciation', headerName: 'The vacciation', width: 160 },
    { field: 'status', headerName: 'The Status', width: 170 ,
    renderCell: (params) =>
    <>
    <Button onClick={(()=>handleClickOpen(params.row))}>
    {params.value}
  </Button>
  <Dialog
    fullScreen
    open={open}
    onClose={handleClose}
    TransitionComponent={Transition}
  >
    
    <AppBar sx={{ position: 'relative' ,backgroundColor:"#FFA800"}}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          View Pet
        </Typography>         
      </Toolbar>
    </AppBar>
    <List>
     <PetDisplayAdmin petData={data}/>
    </List>
  </Dialog>
</>
             
},
    {
      field: 'order', headerName: 'Pet Order', width: 120,
      renderCell: (params) =>
        petOrderData.some((order) => order.petId === params.row.id) ? (
          <>
            {
              petOrderData.map((order) => {
                if (order.petId === params.row.id) {
                  return order.status === 'pending' ? (
                    <>
                      <ThemeProvider theme={theme}>
                        <PetsIcon />
                      </ThemeProvider>
                    </>
                  ) : (
                    <CheckCircleIcon />
                  );
                }
                return null;
              })
            }
          </>
        ) : null
    },
    {
      field: 'delet', headerName: 'Delete pet', width: 120,
      renderCell: (params) =>        
      <>
      {
        loading?<Loding/>:
        <IconButton onClick={() => handeldelet(params.row)}  aria-label="delete">
        <DeleteIcon />
      </IconButton>
      }
      
    </>
        
    },
  ];


  //delet  pet 
  const deleteDocument = async (documentId) => {
    try {
      await deleteDoc(doc(db, 'pets', documentId));
      console.log('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  //delete image pet
  const deleteImages = async (imageUrls) => {
    try {
      const promises = imageUrls.map((url) => {
        const imageUrl = decodeURIComponent(url); // Decode the URL if necessary
        const imageRef = ref(storage, imageUrl);
        return deleteObject(imageRef);
      });
      await Promise.all(promises);
      console.log('Images deleted successfully');
    } catch (error) {
      console.error('Error deleting images:', error);
    }
  };
  async function handeldelet(pet) {
    setLoading(true);
    try {

      await deleteImages(pet.images);
      await deleteDocument(pet.id);
      setLoading(false);
     window.location.reload();
    } catch (error) {
      setLoading(false);

      console.error('Error deleting pet:', error);
      // Handle error and display an error alert if necessary
    }
  }
    return(
        <>
        <SideBar/>
        
        <Box 
        sx={{
            marginLeft: 10,
            marginTop: 5,
            marginRight: 3,
        }}
        >
         <h2>Pets</h2>
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




