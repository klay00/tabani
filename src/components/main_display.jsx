
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import '../App.css';
import { db } from '../firebase/firebase';
import OverflowCard from './cart';
import { SkeltonCard } from './skelton_card';
import { Autocomplete, Button, TextField, ThemeProvider } from "@mui/material";
import theme from "../tools/theem";
import { options, Location } from "./pagelist";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

export default function MainDisplay() {
  const [dataPet, setDataPet] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [loding,setloding]=useState(false)
  useEffect(() => {
    
    setloding(true)
    // Read data from database
    const fetchPetData = async () => {
      const petQuerySnapshot = await getDocs(collection(db, 'pets'));
      const petData = petQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataPet(petData);
    };

    const fetchUserData = async () => {
      
      const userQuerySnapshot = await getDocs(collection(db, 'users'));
      const userData = userQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataUser(userData);
      setloding(false);
    };

    fetchPetData();
    fetchUserData();
  }, []);

  const [petValue, setPetValue] = useState("");
  const [locationValue, setLocationValue] = useState("");

  const handleSubmit =async (event) => {
      event.preventDefault();

      if (!petValue && !locationValue) {
        console.log('--------------------');
      } else {
        setloding(true)
        console.log(petValue ? petValue.label : 'Pet value is empty');
        console.log(locationValue ? locationValue.label : 'Location value is empty');
        console.log('xxxxxxxxxxxxxx');
        
        const filteredPets = dataPet.filter((pet) => pet.type === petValue.label);
        console.log(filteredPets);
          
        
          setloding(false)
      }
  };


  return (
    <div className="main">
      <div className="first">
        {/* <Search /> */}
        <div style={{ width: '100%' }}>
            <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit} >
                    <div className="input-search" >
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={options}
                                fullWidth
                                value={petValue}
                                onChange={(event, newValue) => setPetValue(newValue)}
                                renderInput={(params) => <TextField {...params} label="Pet" />}
                            />
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Autocomplete
                                disablePortal
                                id="combo-box-dem"
                                fullWidth
                                options={Location}
                                value={locationValue}
                                onChange={(event, newValue) => setLocationValue(newValue)}
                                renderInput={(params) => <TextField {...params} label="Location" />}
                            />
                        </Box>                          
                        <Button type="submit" variant="contained" sx={{ fontSize: 'md', pl: 5, pr: 5 }}>
                            <SearchIcon />   Search
                        </Button>
                    </div>
                </form>
            </ThemeProvider>
        </div>
      </div>
      <div className="main-display-items">
        {
          loding?    
         <SkeltonCard/>          
          :<>
          {dataUser.map((user) =>
            dataPet.map((pet) => {
              if (pet.userId === user.userId) {
                return (<>
                  <OverflowCard
                    key={pet.id}
                    petname={pet.fullName}
                    userfullName={user.fullName}
                    petImage={pet.images[0]}
                    userLocation={user.location}
                    petState={pet.status}
                    petId={pet.id}
                    pet={pet}
                    user={user}
                  />
                  </>
                );
              }
              return null;
            })
          )}</>
        }
          
      </div>
    </div>
  );
}
