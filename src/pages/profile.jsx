import { Avatar } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import OverflowCard from "../components/cart";
import NavBar from "../components/navbar";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLocation } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { SkeltonCard } from "../components/skelton_card";
import { Button, IconButton } from "@mui/joy";
import EditIcon from '@mui/icons-material/Edit';
export default function Profile() {
  const data=useLocation();
  const userData=data.state;
  console.log(userData);
const [loding ,setLoding]=useState(false)
  const [petData, setPetData] = useState([]);
  const featchUserData = async () => {
    setLoding(true);
      const q = await getDocs(collection(db, 'pets'));
      const petData = q.docs.filter((doc) => doc.data().userId === userData.userId)
          .map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }));
          setPetData(petData)
          setLoding(false);

  }
useEffect(()=>{
  
  featchUserData();
},[])
console.log(loding);
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
            <Avatar sx={{ marginRight: '20px', width: 65, height: 65 }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzuw3ZNTNZZQgARGpWW7f6hColBKQKZ9qo6eW3giZIawfCbFziSINYfpht19iH8ndNnQA&usqp=CAU'>
            </Avatar>
            <IconButton color="warning" sx={{pl:1,pr:1,width:60}}>
              <EditIcon/>
            </IconButton>
            </Stack>
            <div>
              <h2 >{userData.fullName}</h2>
              <Stack direction={{ xs: 'row', sm: 'row' }}
                spacing="2"
              >
                <LocationOnIcon></LocationOnIcon>{userData.location}
              </Stack>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae a odit ea porro mollitia, aliquid, fugit sint distinctio consectetur quia voluptate facere exercitationem adipisci quidem aut in ut sed quasi!</p>

            </div>

          </Stack>
        </div>
        <div className="main-display-items">
          

           {
            petData.map((pet)=>{
              return(
                <>
                {
                  !loding?                 
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
                /> :<SkeltonCard/>
                 
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