
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import '../App.css';
import { db } from '../firebase/firebase';
import OverflowCard from './cart';
import Search from './serch';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';



export default function MainDisplay() {
  const count =[1,3,4,5,6,7,8,9,1,11,12,12];
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

  return (
    <div className="main">
      <div className="first">
        <Search />
      </div>
      <div className="main-display-items">
        {
          loding?    
          count.map(()=>{
            return(
              <Stack spacing={1} borderRadius={5}>
              {/* For variant="text", adjust the height via font-size */}
              <Skeleton variant="rectangular" width={250} height={100} borderRadius={20} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              {/* For other variants, adjust the size with `width` and `height` */}
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rounded" width={250} height={60} borderRadius={5}/>
            </Stack>
            )
          })
          
          
          :<>
          {dataUser.map((user) =>
            dataPet.map((pet) => {
              if (pet.userId === user.userId) {
                return (
                  <OverflowCard
                    key={pet.id} // Add a unique key for each card
                    petname={pet.fullName}
                    user={user.fullName}
                    petImage={pet.images[0]}
                    userLocation={user.location}
                    petState={pet.status}
                  />
                );
              }
              return null; // Return null if the condition is not met
            })
          )}</>
        }
          
      </div>
    </div>
  );
}
