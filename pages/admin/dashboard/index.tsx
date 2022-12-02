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
  ArcElement,
} from 'chart.js'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import AdminLayout from 'components/AdminLayout'
import WelcomeBanner from 'components/Banner/WelcomeBanner'
import DoughnutChartCard from 'components/Card/DoughnutChartCard'
import OrderMonthCard from 'components/Card/OrderMonthCard'
import OrderYearCard from 'components/Card/OrderYearCard'
import { getChartsDataApi } from 'services/order/orderServices'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend
)

const labels = [
  {
    label: 'Jan',
    value: 1,
  },
  {
    label: 'Feb',
    value: 2,
  },
  {
    label: 'Mar',
    value: 3,
  },
  {
    label: 'Apr',
    value: 4,
  },
  {
    label: 'May',

    value: 5,
  },
  {
    label: 'Jun',

    value: 6,
  },
  {
    label: 'Jul',
    value: 7,
  },
  {
    label: 'Aug',
    value: 8,
  },
  {
    label: 'Sep',
    value: 9,
  },
  {
    label: 'Oct',
    value: 10,
  },
  {
    label: 'Nov',
    value: 11,
  },
  {
    label: 'Dec',
    value: 12,
  },
]

const yearOriginalData = {
  labels: labels.map((a) => a.label),
  datasets: [
    {
      label: '2022',
      data: [0, 0, 0, 0, 10, 0, 0, 0, 4, 5, 2, 1],
    },
  ],
}

const monthOriginalData = {
  labels: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ],
  datasets: [
    {
      label: '2022',
      data: [
        0, 0, 0, 0, 10, 0, 0, 0, 4, 5, 0, 0, 0, 0, 10, 0, 0, 0, 4, 5, 0, 0, 0,
        0, 10, 0, 0, 0, 4, 5, 10,
      ],
    },
  ],
}

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0,
      borderWidth: 2,
      borderColor: 'rgba(47, 97, 68, 1)',
      fill: false,
      backgroundColor: 'rgba(47, 97, 68, 0.3)',
    },
    point: {
      radius: 0,
      hitRadius: 0,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 50,
      ticks: {
        stepSize: 5,
      },
    },
  },
}

interface IData {
  labels: Array<any>
  datasets: Array<IDataSets>
}

interface IDataSets {
  data: Array<number>
}

const Dashboard = () => {
  const [year, setYear] = useState(2022)
  const [yearData, setYearData] = useState<IData>(yearOriginalData)
  const [monthData, setMonthData] = useState<IData>(monthOriginalData)

  const fetchChartData = async (year: number, month: number) => {
    try {
      const res = await getChartsDataApi(year, month)
      let newData: IData = { datasets: [{} as IDataSets] } as IData
      newData.datasets[0].data = res.data
      if (month === 0) {
        newData.labels = yearData.labels
        setYearData(newData)
      } else {
        newData.labels = monthData.labels
        setMonthData(newData)
      }
      setYear(year)
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchChartData(year, 0)
  }, [])

  return (
    <AdminLayout title="Dashboard">
      <WelcomeBanner />
      <OrderYearCard
        fetchChartData={fetchChartData}
        yearData={yearData}
        options={options}
      />
      <OrderMonthCard
        fetchChartData={fetchChartData}
        labels={labels}
        monthData={monthData}
        options={options}
        year={year}
      />
      <DoughnutChartCard />
    </AdminLayout>
  )
}

export default Dashboard
