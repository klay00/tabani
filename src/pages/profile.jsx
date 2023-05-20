import { Avatar } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import OverflowCard from "../components/cart";
import NavBar from "../components/navbar";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Profile() {
  return (
    <>
      <NavBar />
      <div className="main">
        <div className="first">
          <Stack
            direction={{ xs: 'row', sm: 'row' }}
            spacing="2"
          >
            <Avatar sx={{ marginRight: '20px', width: 65, height: 65 }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzuw3ZNTNZZQgARGpWW7f6hColBKQKZ9qo6eW3giZIawfCbFziSINYfpht19iH8ndNnQA&usqp=CAU'>
            </Avatar>
            <div>
              <h2 >the account name</h2>
              <Stack direction={{ xs: 'row', sm: 'row' }}
                spacing="2"
              >
                <LocationOnIcon></LocationOnIcon> Dora
              </Stack>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae a odit ea porro mollitia, aliquid, fugit sint distinctio consectetur quia voluptate facere exercitationem adipisci quidem aut in ut sed quasi!</p>

            </div>

          </Stack>
        </div>
        <div className="main-display-items">
          <OverflowCard />
          <OverflowCard />
          <OverflowCard />
          <OverflowCard />
          <OverflowCard />
          <OverflowCard />
          <OverflowCard />
          <OverflowCard />
        </div>
      </div>
    </>
  );
}