import { Avatar } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import OverflowCard from "../components/cart";
import NavBar from "../components/navbar";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLocation } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { SkeltonCard } from "../components/skelton_card";
import EditProfile from "../components/EditProfile";
import "../App.css"


export default function Profile() {
  const data = useLocation();
  const userData = data.state;
  const [loding, setLoding] = useState(false)
  const [petData, setPetData] = useState([]);
  const featchUserData = async () => {
    setLoding(true);
    const q = await getDocs(collection(db, 'pets'));
    const petData = q.docs
    .filter((doc) => doc.data().userId === userData.userId)
    .filter(doc=>doc.data().status==='Available to Adopt')

      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    setPetData(petData)
    setLoding(false);

  }
  useEffect(() => {

    featchUserData();
  }, [])

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // User is logged in, fetch user information from Firestore
        fetchUserData(authUser.uid);
      } else {
        // User is not logged in
        setUser(null);
      }
    });

    // Clean up the listener
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const snapshot = await getDoc(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.data();
        setUser(userData);

      } else {
        // User document does not exist
        setUser(null);
      }
    } catch (error) {

    }
  };

  return (
    <>
      <NavBar />
      <div className="main">
        <div className="first">
          <Stack
            direction={{ xs: 'row', sm: 'row' }}
            spacing={2}
          >
            <Stack direction={'column'} spacing={1} >
              <div className="avatarprofile">
               <Avatar sx={{ marginRight: '20px', width: 65, height: 65}} src={userData.profileImage}>
              </Avatar> 
              </div>
              
              {
                user?.userId === userData?.userId ? <EditProfile userId={userData?.userId} /> : null
              }
            </Stack>
            <div>
              <h2 >{userData.fullName}</h2>
              <Stack direction={{ xs: 'row', sm: 'row' }}
                spacing="2"
              >
                <LocationOnIcon></LocationOnIcon>{userData.location}
              </Stack>
              <p>
                {
                  userData.discreption
                 
                }
              </p>

            </div>

          </Stack>
        </div>
        <div className="main-display-items">


          {
            petData.map((pet) => {
              return (
                <>
                  {
                    !loding ?
                      <OverflowCard
                        key={pet.id} // Add a unique key for each card
                        petname={pet.fullName}
                        userfullName={userData.fullName}
                        petImage={pet.images[0]}
                        userLocation={userData.location}
                        petState={pet.status}
                        petId={pet.id}
                        pet={pet}
                        user={userData}
                        userImage={userData.profileImage}
                      /> : <SkeltonCard />

                  }

                </>
              )
            })
          }


        </div>
      </div>
    </>
  );
}