// import { DataUsage } from '@mui/icons-material';
// import { collection, onSnapshot, query } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react';
// import '../App.css';
// import { db } from '../firebase/firebase';
// import OverflowCard from './cart';
// import Search from './serch';


// export default function MainDisplay() {
//     const [dataPet ,setDataPet]=useState([]);
//     const [dataUser ,setDataUser]=useState([]);
//       useEffect(() => {
//     //read data form databast
//     const q = query(collection(db, 'pets'))
//     onSnapshot(q, (querySnapshot) => {
//         setDataPet(
//         querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//       );
//     })

//     const qq = query(collection(db, 'users'))
//     onSnapshot(qq, (querySnapshot) => {
//         setDataUser(
//         querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//       );
//     })
//   }, [])

//     return(
//         <>
//         <div className="main">
//             <div className="first">
//                 <Search/>
//             </div>
//             <div className="main-display-items">
//                 {
//                   dataUser.map((user)=>{
//                     dataPet.map((pet)=>{
//                         if(pet.userId===user.userId){
//                           return(
//                             <OverflowCard petname={pet.fullName} user={user.fullName} petImage={pet.images[0]} userLocation={user.location} petState={pet.status}/>
                        
//                           )
//                         }
//                     })
//                   })
//                 }
//             </div>
//         </div>
//         </>
//     )
// }
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import '../App.css';
import { db } from '../firebase/firebase';
import OverflowCard from './cart';
import Search from './serch';

export default function MainDisplay() {
  const [dataPet, setDataPet] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
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
        )}
      </div>
    </div>
  );
}
