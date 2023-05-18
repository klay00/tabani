import React from "react";
import NavBar from "../components/navbar";
import '../App.css';
import { AspectRatio, Button } from "@mui/joy";
import { Stack } from "@mui/system";

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
                        <Stack
                            direction={{ xs: 'row', sm: 'row' }}
                            spacing="2"
                            alignItems="center"
                        >
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
                        </Stack>
                    </div>
                </div>
                <div className="pet-info">
                    <div className="info"></div>
                    <div className="account"></div>
                </div>
            </div>

        </>
    );
}