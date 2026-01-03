/*
  Component: WorkoutBarChart
  Purpose: Small summary bar chart displaying minutes per activity.
  Notes:
  - Uses `recharts` responsive container and custom bar colors.
  - Data is currently static (placeholder); replace with real data
    if integrating with analytics or user activity.
*/
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const data = [
  { category: 'Cardio', minutes: 120 },
  { category: 'Strength', minutes: 90 },
  { category: 'Yoga', minutes: 60 },
  { category: 'Mobility', minutes: 30 }
];

// Custom colors for each bar
const barColors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

function WorkoutBarChart() {
  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          barGap={0}
          barCategoryGap={5}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip cursor={false} />
          <Bar dataKey="minutes" barSize={80} radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WorkoutBarChart;
