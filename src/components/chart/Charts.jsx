import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const Charts = ({ hotelBookingsData, userData }) => {
  return (
    <div className="flex p-5 gap-20">
      <div className="w-1/2">
        <h2>Biểu đồ số lượng đặt phòng theo tháng</h2>
        <LineChart
          width={500}
          height={300}
          data={hotelBookingsData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name="Số lượng đặt phòng"
            stroke="rgb(75, 192, 192)"
            strokeWidth={2}
          />
        </LineChart>
      </div>
      <div className="w-1/2">
        <h2>Biểu đồ số lượng người dùng</h2>
        <BarChart
          width={500}
          height={300}
          data={userData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="value"
            name="Số lượng người dùng"
            fill="rgba(255, 99, 132, 0.6)"
          />
        </BarChart>
      </div>
    </div>
  );
};

export default Charts;
