/*
  Component: DietChart
  Purpose: Render a small pie chart summarizing macronutrient breakdown.
  Notes:
  - Uses `recharts` PieChart and maps `data` -> `Cell` colors.
  - Label formatter shows percentage and tooltip shows grams.
*/
import React from "react";
import styles from './dietChart.module.css'

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function DietChart() {
  const data = [
    { name: "Proteins", value: 50.5, color: "#32C768" }, // green
    { name: "Fat", value: 26.4, color: "#FF8C42" }, // orange
    { name: "Carbohydrates", value: 156.3, color: "#FFCE56" }, // yellow
  ];

  const COLORS = data.map((d) => d.color);

  return (
    <div className={styles.container}>
      <PieChart className={styles.chart} width={600} height={300}>
        <Pie
        height={200}
        width={200}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={{fontWeight: 'bold'}} formatter={(value) => `${value} gm`} />
        <Legend className={styles.legend} layout="vertical" align="right" verticalAlign="middle"
        />
      </PieChart>
    </div>
  );
}

export default DietChart;
