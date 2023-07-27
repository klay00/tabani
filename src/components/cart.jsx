import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/joy';
import { Stack, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function OverflowCard({
  petname,
  userfullName,
  user,
  petImage,
  userLocation,
  petState,
  pet,
  userImage,
}) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} width={{xs:'100%',lg:'24%',md:'32%',sm:'49%'}} height={'fit-content'} >
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          padding: "15px",
          border: '10px solid white',
          aspectRatio:'auto',
          gap:'3px',
          
        }}
       padding={0}
      >
        <CardOverflow fullWidth>
          <AspectRatio ratio="1.5">
            <Link to={`../petpage/${pet.id}`}>
              <img src={petImage} loading="lazy" alt="" />
            </Link>
          </AspectRatio>
        </CardOverflow>
        <Typography level="h2" sx={{ fontSize: 'md', mt: 1 }}>
          <Link to={`../petpage/${pet.id}`}>
            {petname}
          </Link>
        </Typography>
        <Typography level="body2" >
          <Link to={'../profile'} state={user}>
            <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2} alignItems="center">
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
            <Stack direction={{ xs: 'row', sm: 'row' }} spacing={2} alignItems="center">
              <LocationOnIcon />
              {userLocation}
            </Stack>
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
            {petState}
          </Typography>
        </CardOverflow>
      </Card>
    </Grid>
  );
}
