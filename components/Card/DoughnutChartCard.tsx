import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar, Line, Scatter, Bubble, Doughnut } from 'react-chartjs-2'
// import DoughnutChart from '../../charts/DoughnutChart'

// Import utilities
// import { tailwindConfig } from '../../utils/Utils'
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Title,
//   Tooltip,
//   Legend
// )
const data = {
  backgroundColor: [
    'rgb(2, 88, 255)',
    'rgb(249, 151, 0)',
    'rgb(255, 199, 0)',
    'rgb(32, 214, 152)',
  ],
  labels: ['Event 1', 'Event 2', 'Event 3', 'Event 4'],
  datasets: [
    {
      label: 'My first Dataset',
      data: [300, 50, 100, 300],
      backgroundColor: [
        'rgb(2, 88, 255)',
        'rgb(249, 151, 0)',
        'rgb(255, 199, 0)',
        'rgb(32, 214, 152)',
      ],
      hoverOffset: 4,
    },
  ],
}

const options = {
  elements: {
    arc: {
      weight: 0.5,
      borderWidth: 2,
    },
  },
  cutout: 150,
}

function DoughnutChartCard() {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Top Countries</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <Doughnut data={data} width={50} height={50} options={options} />
    </div>
  )
}

export default DoughnutChartCard
