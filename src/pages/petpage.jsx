import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import '../App.css';
import { AspectRatio, Avatar, Button, Stack } from "@mui/joy";
import { catImageList } from "../components/pagelist";
import MainButtom from "../components/buttom";
import { Link } from "react-router-dom";
import FullScreenDialog from "../components/adubt_inputs";

export default function PetPage() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const [imgUrl, setImgUrl] = useState([]);
    // setImgUrl(0);
    useEffect(() => {
        catImageList.map((img) => {
            setImgUrl(img.imgSrc)
        })
    }, []);
    function handellUrl(url) {
        setImgUrl(url)
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
                            catImageList.map((catimg) => {
                                return (
                                    <>
                                        <Button onClick={() => { handellUrl(catimg.imgSrc) }}>
                                            <img
                                                src={catimg.imgSrc}
                                                loading="lazy"
                                                alt="pet image"
                                            />
                                        </Button>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="pet-info">
                    <div className="info">
                        <table className="pet-info-table">
                            <thead>
                                <tr className="pet-info-head">
                                    <td ><h3>pet name</h3> </td>
                                    <td className="avilple-to-adopt">Avilple to adubt</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td ><h4>Type</h4> </td>
                                    <td>Dog</td>

                                </tr>
                                <tr>
                                    <td ><h4>Color</h4> </td>
                                    <td>White</td>

                                </tr>
                                <tr>
                                    <td ><h4>Age</h4> </td>
                                    <td>2 yers</td>


                                </tr>
                                <tr>
                                    <td ><h4>Sex</h4> </td>
                                    <td>Male</td>


                                </tr>
                                <tr>
                                    <td ><h4>Location</h4> </td>
                                    <td>Dora</td>


                                </tr>
                                <tr>
                                    <td ><h4>Size</h4> </td>
                                    <td>5 kg</td>

                                </tr>
                                <tr>
                                    <td ><h4>Vaccination from the disease</h4></td>
                                    <td>yes</td>

                                </tr>

                            </tbody>



                        </table>
                        <div className="but-adobt">
                            <FullScreenDialog/>
                        </div>
                    </div>
                    <div className="account">
                        <Stack
                            direction={{ xs: 'row', sm: 'row' }}
                            spacing="2"
                            alignItems="center">
                            <Avatar  sx={{ marginRight: '20px' ,width: 65, height: 65 }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzuw3ZNTNZZQgARGpWW7f6hColBKQKZ9qo6eW3giZIawfCbFziSINYfpht19iH8ndNnQA&usqp=CAU'>
                            </Avatar>
                            <h2 >the account name</h2>
                        </Stack>
                        <div className="but-adobt">
                            <Link to={'/profile'}>
                            <MainButtom name={'view Account'} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}