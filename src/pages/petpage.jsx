import React from "react";
import NavBar from "../components/navbar";
import '../App.css';
import { AspectRatio, Button } from "@mui/joy";
import { Stack } from "@mui/system";
import { Grid } from "@mui/material";

export default function PetPage() {
    return (
        <>
            <NavBar />
            <div className="pet-main">
                <div className="pet-images">
                    <div className="main-image">
                        <AspectRatio ratio="2/1.2" >
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzuw3ZNTNZZQgARGpWW7f6hColBKQKZ9qo6eW3giZIawfCbFziSINYfpht19iH8ndNnQA&usqp=CAU"
                                loading="lazy"
                                alt="pet image"
                            />
                        </AspectRatio>
                    </div>
                    <div className="chose-image">
                        <Button>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzuw3ZNTNZZQgARGpWW7f6hColBKQKZ9qo6eW3giZIawfCbFziSINYfpht19iH8ndNnQA&usqp=CAU"
                                        loading="lazy"
                                        alt="pet image"
                                    />
                            </Button>
                            <Button>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzuw3ZNTNZZQgARGpWW7f6hColBKQKZ9qo6eW3giZIawfCbFziSINYfpht19iH8ndNnQA&usqp=CAU"
                                        loading="lazy"
                                        alt="pet image"
                                    />
                            </Button>
                            <Button>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzuw3ZNTNZZQgARGpWW7f6hColBKQKZ9qo6eW3giZIawfCbFziSINYfpht19iH8ndNnQA&usqp=CAU"
                                        loading="lazy"
                                        alt="pet image"
                                    />
                            </Button>
                            <Button>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzuw3ZNTNZZQgARGpWW7f6hColBKQKZ9qo6eW3giZIawfCbFziSINYfpht19iH8ndNnQA&usqp=CAU"
                                        loading="lazy"
                                        alt="pet image"
                                    />
                            </Button>
                            
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