import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { toast } from 'react-toastify'

import { getPieChartsDataApi } from 'services/order/orderServices'

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

interface IData {
  backgroundColor: Array<string>
  labels: Array<string>
  datasets: Array<IDataSet>
}

interface IDataSet {
  label: string
  data: Array<number>
  backgroundColor: Array<string>
  hoverOffset: number
}

function DoughnutChartCard() {
  const [doughnutChart, setDoughnutChart] = useState<IData>(data)

  const fetchPieChartData = async () => {
    try {
      const res = await getPieChartsDataApi()
      let newData: IData = { datasets: [{} as IDataSet] } as IData
      newData.backgroundColor = res.data.colors
      newData.labels = res.data.labels
      newData.datasets[0].data = res.data.numbers
      newData.datasets[0].backgroundColor = res.data.colors
      setDoughnutChart(newData)
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPieChartData()
  }, [])

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Orders by category</h2>
      </header>

      <Doughnut data={doughnutChart} width={50} height={50} options={options} />
    </div>
  )
}

export default DoughnutChartCard
