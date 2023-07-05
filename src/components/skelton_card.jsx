import React from "react"
import Skeleton from '@mui/material/Skeleton';
import { Stack, Grid } from '@mui/material';
export function SkeltonCard() {
    const count =[1,2,3,4,5,6,7,8];

    return(
        <>
        {
             count.map(()=>{
                return(
                  <>
            <Grid item xs={12} sm={6} md={4} lg={3} width={{xs:'100%',lg:'24%',md:'32%',sm:'49%'}} height={'fit-content'} >
                  <Stack spacing={1} borderRadius={5}>
 
                   <Skeleton variant="rectangular"  height={100} borderRadius={20} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rounded" height={60} borderRadius={5}/>
                </Stack>
                </Grid>
              </>
                )
              })
        }
        </>
    )
}