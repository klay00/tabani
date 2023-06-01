
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import '../App.css';
import { db } from '../firebase/firebase';
import OverflowCard from './cart';
import Search from './serch';
import { SkeltonCard } from './skelton_card';



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

  return (
    <div className="main">
      <div className="first">
        <Search />
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
                    key={pet.id} // Add a unique key for each card
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
              return null; // Return null if the condition is not met
            })
          )}</>
        }
          
      </div>
    </div>
  );
}
