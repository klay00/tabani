import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../App.css';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import Loding from './loading';

function handeldelet(id) {
  console.log(id);
}
export const rows1 = [];

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
    field: 'delet', headerName: 'Delete pet', width: 120,
    renderCell: (params) => <IconButton onClick={() => handeldelet(params.value)} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  },
];

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
    console.log(petData);
  };

  useEffect(() => {
    if (petDataI.length === 0 && !loading) {
      fetchPetData();
    }
  }, [petDataI, loading]);

  return (
    <Box className={"tbale-dash-user"} sx={{ height: 400, width: '100%' }}>
      {!loading ? (
         <DataGrid rows={petDataI} columns={columns} />
      ) : (
        <Loding name={'reload'}/>
      )}
    </Box>
  );
}
