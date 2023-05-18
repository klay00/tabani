import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Link } from "react-router-dom";
import { Avatar, ListItem } from '@mui/joy';
import { Stack } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';
export default function OverflowCard() {
  return (
    <Card variant="outlined" sx={{ width: 250, py: 0, mb: 2 }}>
      <CardOverflow fullWidth >
        <AspectRatio ratio="1.5">
          <Link to={'../petpage'}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzuw3ZNTNZZQgARGpWW7f6hColBKQKZ9qo6eW3giZIawfCbFziSINYfpht19iH8ndNnQA&usqp=CAU"
              // srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </Link>
        </AspectRatio>
      </CardOverflow>
      <Typography level="h2" sx={{ fontSize: 'md', mt: 1 }}>
        <Link to={'../petpage'}>
          Yosemite National Park
        </Link>

      </Typography>
      <Typography level="body2" sx={{ mt: 0.5, mb: 1 }}>
        <Link to={'../profile'}>
          <Stack
            direction={{ xs: 'row', sm: 'row' }}
            spacing="2"
            alignItems="center"
          >
            <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzuw3ZNTNZZQgARGpWW7f6hColBKQKZ9qo6eW3giZIawfCbFziSINYfpht19iH8ndNnQA&usqp=CAU'></Avatar>
            the accunt name
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
            <LocationOnIcon></LocationOnIcon> Dora
          </Stack>
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          Avilple to adoption
        </Typography>
      </CardOverflow>
    </Card>
  );
}