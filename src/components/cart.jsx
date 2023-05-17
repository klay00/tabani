import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';

export default function OverflowCard() {
  return (
    
    <Card variant="outlined" sx={{ width: 250 ,py: 0,mb:2}}>
      <CardOverflow>
        <AspectRatio ratio="1.5">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzuw3ZNTNZZQgARGpWW7f6hColBKQKZ9qo6eW3giZIawfCbFziSINYfpht19iH8ndNnQA&usqp=CAU"
            // srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <Typography level="h2" sx={{ fontSize: 'md', mt: 1 }}>
        Yosemite National Park 
      </Typography>
      <Typography level="body2" sx={{ mt: 0.5, mb: 1 }}>
        California
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
          6.3k views
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          1 hour ago
        </Typography>
      </CardOverflow>
    </Card>
  );
}