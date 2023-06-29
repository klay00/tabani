import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/system';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export default function CharCircle({pet,order,user}) {
 const data = {
    labels: ['Pets', 'Users', 'Orders'],
    datasets: [
      {
        label: 'Value',
          data: [pet , user ,order ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }; 
  console.log(pet.length, user.length,order.length);
    return(
        <>
        <Box
                        sx={{
                            width:250,
                            height: 350,
                            borderRadius: 3,
                            flexGrow: 1,
                            padding:2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <Doughnut data={data}/>
                    </Box>
        </>
    )
 }