import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../App.css';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function handeldelet(id) {
    console.log(id);
}

const columns = [
    { field: 'imgSrc', headerName: 'Image', width: 80, renderCell: (params) => <Avatar src={params.value} /> },
    { field: 'firstName', headerName: 'First name', width: 100 },
    { field: 'type', headerName: 'The type', width: 100 },
    { field: 'age', headerName: 'The Age', width: 100 },
    { field: 'sex', headerName: 'The Sex', width: 100 },
    { field: 'locaton', headerName: 'The locaton', width: 100 },
    { field: 'size', headerName: 'The size', width: 100 },
    { field: 'vacciation', headerName: 'The vacciation', width: 120 },
    { field: 'status', headerName: 'The Status', width: 120 },
    { 
        field: 'delet', headerName: 'Delete pet', width: 120 ,
        renderCell: (params) => <IconButton onClick={()=>handeldelet(params.value)} aria-label="delete"> 
    <DeleteIcon />
  </IconButton> },


];

export const rows = [
    { id: 1,  firstName: 'Jon',
     imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhCF9j3Snc4VHPQVcT3RwnS5hYCDT0FrvBg&usqp=CAU',
      age: '2', sex: 'male', type: 'dog', locaton: 'dora', size: '5kg', vacciation: 'yes' ,status:"adopt" },
    { id: 2, firstName: 'Cersei', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhCF9j3Snc4VHPQVcT3RwnS5hYCDT0FrvBg&usqp=CAU', age: '2', sex: 'male', type: 'dog', locaton: 'dora', size: '5kg', vacciation: 'yes' ,status:"available"},
    { id: 3,  firstName: 'Jaime', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhCF9j3Snc4VHPQVcT3RwnS5hYCDT0FrvBg&usqp=CAU', age: '2', sex: 'male', type: 'dog', locaton: 'dora', size: '5kg', vacciation: 'yes',status:"adopt" },
    { id: 4, firstName: 'Arya', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhCF9j3Snc4VHPQVcT3RwnS5hYCDT0FrvBg&usqp=CAU', age: '2', sex: 'male', type: 'dog', locaton: 'dora', size: '5kg', vacciation: 'yes' ,status:"available"},
    { id: 5, firstName: 'Arya5', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhCF9j3Snc4VHPQVcT3RwnS5hYCDT0FrvBg&usqp=CAU', age: '2', sex: 'male', type: 'dog', locaton: 'dora', size: '5kg', vacciation: 'yes' ,status:"available"},
    { id: 6, firstName: 'Daenerys', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhCF9j3Snc4VHPQVcT3RwnS5hYCDT0FrvBg&usqp=CAU', age: '2', sex: 'male', type: 'dog', locaton: 'dora', size: '5kg', vacciation: 'yes',status:"pending"},
];

export default function ValueGetterGrid() {
    return (
        <Box className={"tbale-dash-user"} sx={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </Box>
    );
}