import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Link } from "react-router-dom";
import { Avatar } from '@mui/joy';
import { Stack } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';



export default function OverflowCard({ petname, userfullName, user, petImage, userLocation, petState, pet, userImage }) {
  return (
    <Card className={'card-resp'} variant="outlined" sx={{
      width: {
        sm: 160,
        md: 230, // For medium screens (md)
        lg: 260, // For large screens (lg)
      },
      maxHeight: {
        sm: "36vh",
        md: "45vh",
        lg: "42vh"
      },
      overflow: 'hidden',
      padding: 1,
    }}>

      <CardOverflow fullWidth >
        <AspectRatio ratio="1.5">
          <Link to={'../petpage'} state={pet}>
            <img
              src={petImage}
              loading="lazy"
              alt=""
            />
          </Link>
        </AspectRatio>
      </CardOverflow>
      <Typography level="h2" sx={{ fontSize: 'md', mt: 1 }}>
        <Link to={'../petpage'} state={pet}>
          {[petname]}
        </Link>


      </Typography>
      <Typography level="body2" sx={{ mt: 0.5, mb: 1 }}>
        <Link to={'../profile'} state={user}>
          <Stack
            direction={{ xs: 'row', sm: 'row' }}
            spacing="2"
            alignItems="center"
          >
            <Avatar sx={{ marginRight: '10px', borderRadius: '100%' }} src={userImage}></Avatar>
            {userfullName}
          </Stack>
        </Link>
      </Typography>
      <Divider />
      <CardOverflow
        variant="soft"
        sx={{
          display: 'flex',
          gap: 1.5,
          py: 1,
          px: 'var(--Card-padding)',
          bgcolor: 'background.level1',
        }}
      >
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          <Stack
            direction={{ xs: 'row', sm: 'row' }}
            spacing="2"
            alignItems="center">
            <LocationOnIcon></LocationOnIcon> {userLocation}
          </Stack>
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          {petState}
        </Typography>
      </CardOverflow>
    </Card>
  );
}