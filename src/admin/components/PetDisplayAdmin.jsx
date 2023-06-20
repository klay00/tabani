import React, { useEffect, useState } from "react";
import '../../App.css';
import { AspectRatio, Avatar, Stack } from "@mui/joy";
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from "../../firebase/firebase";
import { Button } from "@mui/material";
import Lodaer from "../../components/loader";


export default function PetDisplayAdmin({ petData }) {

    const [loding ,setLoding]=useState(false)
    const [pet, setpet] = useState([]);
    useEffect(() => {
        setpet(petData);
        console.log(petData);
        featchUserData()
    }, []);
    console.log(pet);


    const [imgUrl, setImgUrl] = useState([]);
    useEffect(() => {
        if (pet.images && pet.images.length > 0) {
            setImgUrl(pet.images[0]);
            featchUserData()
        }
    }, [pet]);
    function handellUrl(url) {
        setImgUrl(url)
    }
    const [userData, setUserData] = useState([]);
    const featchUserData = async () => {
        const q = await getDocs(collection(db, 'users'));
        const userData = q.docs.filter((doc) => doc.data().userId === pet.userId)
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        setUserData(...userData)
    }
    const handelPost = async (id) => {
        setLoding(true);
        try {

            const documentRef = doc(db, 'pets', id);
            const updatedData = {
                status: 'Available to Adopt'
            };
            await updateDoc(documentRef, updatedData);
            window.location.reload();
            alert('Pet Hase been Posted')
            setLoding(false);
        } catch (e) {
            console.log(e);
        }
    }


    const handelStopPost = async (id) => {
        setLoding(true);
        try {

            const documentRef = doc(db, 'pets', id);
            const updatedData = {
                status: 'pending'
            };
            await updateDoc(documentRef, updatedData);
            window.location.reload();
            setLoding(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="pet-main">
                <div className="pet-images">
                    <div className="main-image">
                        <AspectRatio ratio="2/1.4" >

                            <img className="maim-img-pet"
                                src={imgUrl}
                                loading="lazy"
                                alt="pet image"
                            />
                            <img className="back-image"
                                src={imgUrl}
                                loading="lazy"
                                alt="pet image"
                            />
                        </AspectRatio>
                    </div>
                    <div className="chose-image">
                        {
                            pet.images && pet.images.map((image, i) => (
                                <Button sx={{ padding: 0, margin: 1 }} onClick={() => { handellUrl(image) }}>
                                    <img
                                        key={i}
                                        src={image}
                                        loading="lazy"
                                        alt="pet image"
                                    />
                                </Button>
                            ))
                        }
                    </div>
                </div>
                <div className="pet-info">
                    <div className="info">
                        <table className="pet-info-table">
                            <thead>
                                <tr className="pet-info-head">
                                    <td ><h3>{pet.fullName}</h3> </td>
                                    <td className="avilple-to-adopt">{pet.status}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td ><h4>Type</h4> </td>
                                    <td>{pet.type}</td>

                                </tr>
                                <tr>
                                    <td ><h4>Age</h4> </td>
                                    <td>{pet.age}</td>


                                </tr>
                                <tr>
                                    <td ><h4>Sex</h4> </td>
                                    <td>{pet.sex}</td>


                                </tr>
                                <tr>
                                    <td ><h4>Location</h4> </td>
                                    <td>{userData.location}</td>


                                </tr>
                                <tr>
                                    <td ><h4>Size</h4> </td>
                                    <td>{pet.size}</td>

                                </tr>
                                <tr>
                                    <td ><h4>Vaccination from the disease</h4></td>
                                    <td>{pet.avcciation}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="but-adobt2">
                            {
                                pet.status === 'Adopt' ?
                                    <>

                                    </>
                                    : <>

                                        {
                                            pet.status === 'pending' ?

                                                 <>
                                                 {
                                                    loding?
                                                    <Button
                                                    color="success"
                                                    disabled
                                                    variant="contained"><Lodaer/></Button>
                                                    :
                                                    <Button
                                                    color="success"
                                                    onClick={(() => handelPost(pet.id))}
                                                    variant="contained">Post Pet</Button>
                                                    
                                                 }
                                                 </>                                               
                                                : <>
                                                {
                                                    loding?
                                                    <Button
                                                    color="secondary"
                                                    disabled
                                                    variant="contained"><Lodaer/></Button>
                                                    :<Button
                                                    color="secondary"
                                                    onClick={(() => handelStopPost(pet.id))}
                                                    variant="contained">Stop posting</Button>
                                                }
                                                </>
                                        }
                                    </>
                            }
                        </div>
                    </div>
                    <div className="account">
                        <Stack
                            direction={{ xs: 'row', sm: 'row' }}
                            spacing="2"
                            alignItems="center">
                            <Avatar sx={{ marginRight: '20px', width: 65, height: 65 }} src={userData.profileImage}>
                            </Avatar>
                            <h2 >{userData.fullName}</h2>
                        </Stack>
                    </div>
                </div>
            </div>

        </>
    );
}