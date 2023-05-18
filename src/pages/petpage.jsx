import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import '../App.css';
import { AspectRatio, Button } from "@mui/joy";
import { catImageList } from "../components/pagelist";


export default function PetPage() {
    const [imgUrl,setImgUrl]=useState([]);
    // setImgUrl(0);
    useEffect(()=>{
        catImageList.map((img)=>{
            // console.log(img[0]);
            setImgUrl(img.imgSrc)
        }) 
    },[]);
    function handellUrl(url) {       
            console.log(url)
            setImgUrl(url)                                   
    }
   
    return (
        <>
            <NavBar />
            <div className="pet-main">
                <div className="pet-images">
                    <div className="main-image">
                        <AspectRatio ratio="2/1.2" >
                            <img
                                src={imgUrl}
                                loading="lazy"
                                alt="pet image"
                            />
                        </AspectRatio>
                    </div>
                    <div className="chose-image">                      
                             {
                                catImageList.map((catimg)=>{
                                    return(
                                        <>
                                        <Button onClick={()=>{handellUrl(catimg.imgSrc)}}>
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
                    <div className="info">hghghgh</div>
                    <div className="account">ffffffffff</div>
                </div>
            </div>

        </>
    );
}