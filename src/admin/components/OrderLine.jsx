import React from "react";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/joy";
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement, Tooltip, Legend);

const OrderLine = () => {
  const labels = [
    "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7",
    "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13", "Day 14",
    "Day 15", "Day 16", "Day 17", "Day 18", "Day 19", "Day 20", "Day 21",
    "Day 22", "Day 23", "Day 24", "Day 25", "Day 26", "Day 27", "Day 28",
    "Day 29", "Day 30", "Day 31"
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Order Data",
        data: [10, 5, 2, 15, 8, 12, 20, 18, 25, 22, 30, 28, 33, 35, 40, 38, 42, 50, 45, 48, 52, 55, 58, 60, 65, 63, 68, 70, 75, 72],
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Day",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Order Value",
        },
      },
    },
  };

  return (
    <Box
                        sx={{
                            width: 250,
                            height: 350,
                            borderRadius: 3,
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        }}
                    >
      <Line height={ "100%" } data={data} options={options} />
    </Box>
  );
};

export default OrderLine;
