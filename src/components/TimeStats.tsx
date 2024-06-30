import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: Array<any>;
};

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}

const processData = (data: Array<any>) => {
  const dateCounts = data.reduce((acc: any, record: any) => {
    const date = formatDate(new Date(record.vistied_at));
    console.log(date);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  console.log(dateCounts);

  return Object.entries(dateCounts).map(([date, count]) => ({
    date,
    count,
  }));
};

export default function TimeStats({ data }: Props) {
  const processedData = processData(data);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        width={400}
        height={200}
        data={processedData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
