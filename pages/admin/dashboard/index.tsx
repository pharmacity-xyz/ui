import { AxiosRequestConfig } from 'axios'
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
import { useEffect, useState } from 'react'
import { Bar, Line, Scatter, Bubble } from 'react-chartjs-2'
import { toast } from 'react-toastify'
import AdminLayout from '../../../components/AdminLayout'
import WelcomeBanner from '../../../components/Banner/WelcomeBanner'
import OrderMonthCard from '../../../components/Card/OrderMonthCard'
import OrderYearCard from '../../../components/Card/OrderYearCard'
import {
  getChartsDataApi,
  getOrdersForAdminApi,
} from '../../../services/order/orderServices'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      let token = localStorage.getItem('token')
      const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      }
      const res = await getChartsDataApi(config, year, month)
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
    // console.log(monthData[11])
    fetchChartData(year, 0)
    // console.log(yearData)
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
    </AdminLayout>
  )
}

export default Dashboard
