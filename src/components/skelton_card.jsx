import React from "react"
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
export function SkeltonCard() {
    const count =[1,2,3,4,5,6,7,8];
    return(
        <>
        {
             count.map(()=>{
                return(
                  <Stack spacing={1} borderRadius={5}>
                  {/* For variant="text", adjust the height via font-size */}
                  <Skeleton variant="rectangular" width={250} height={100} borderRadius={20} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  {/* For other variants, adjust the size with `width` and `height` */}
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rounded" width={250} height={60} borderRadius={5}/>
                </Stack>
                )
              })
        }
        </>
    )
}