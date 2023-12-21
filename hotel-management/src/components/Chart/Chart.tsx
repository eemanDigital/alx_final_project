"use client";

import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { FC } from "react";
import { Bar } from "react-chartjs-2";

import { Booking } from "@/models/booking";

ChartJS.register(Tooltip, CategoryScale, LinearScale, BarElement);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

/**
 * This component generates a bar chart using Chart.js library to represent the amount spent in various bookings.
 * @param {Object} props - Props containing user bookings data.
 * @param {Booking[]} props.userBookings - Array of Booking objects representing user bookings.
 * @returns {JSX.Element} - Returns a React component displaying a bar chart representing the amount spent in different bookings.
 */

const Chart: FC<{ userBookings: Booking[] }> = ({ userBookings }) => {
  const labels = userBookings.map((booking) => booking.hotelRoom.name);
  const amountSpent = userBookings.map((booking) => booking.totalPrice);

  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            label: "Amount spent",
            data: amountSpent,
            borderWidth: 1,
            backgroundColor: "#F27405",
            hoverBackgroundColor: "#F2C641",
          },
        ],
      }}
    />
  );
};

export default Chart;
