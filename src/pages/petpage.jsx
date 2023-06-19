import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import '../App.css';
import { AspectRatio, Avatar, Button, Stack } from "@mui/joy";
import MainButtom from "../components/buttom";
import { Link, useLocation } from "react-router-dom";
import FullScreenDialog from "../components/adubt_inputs";
import { collection, getDocs } from 'firebase/firestore';
import '../App.css';
import { db } from '../firebase/firebase';
import AlartMessageLogin from "../components/alert_message_login";




export default function PetPage() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const token=localStorage.getItem('token');


    const location = useLocation();
    const [pet, setpet] = useState([]);
    useEffect(() => {
        setpet(location.state);
        console.log(location.state);
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
    return (
        <>
            <NavBar />
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
                                // <img  src={image} alt={`Image ${index + 1}`} />
                                <Button sx={{padding:0,margin:1}} onClick={() => { handellUrl(image) }}>
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
                        <div className="but-adobt">
                            {
                                token?<FullScreenDialog pet={location.state} />:<AlartMessageLogin/>
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
                        <div className="but-adobt">
                            <Link to={'/profile'} state={userData}>
                                <MainButtom name={'view Account'} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}