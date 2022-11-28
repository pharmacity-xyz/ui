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
      newData.labels = yearData.labels
      newData.datasets[0].data = res.data
      setYearData(newData)
      //   setOrders(res.data)
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }
  }

  useEffect(() => {
    // console.log(monthData[11])
    fetchChartData(2022, 0)
    // console.log(yearData)
  }, [])

  return (
    <AdminLayout title="Dashboard">
      <div className="">
        <div className="relative z-0 mb-6 group flex justify-end">
          <select
            id="years"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => fetchChartData(parseInt(e.target.value), 0)}
          >
            <option selected>Choose year</option>
            <option value={2019}>2019</option>
            <option value={2020}>2020</option>
            <option value={2021}>2021</option>
            <option value={2022}>2022</option>
          </select>
        </div>
        <Line data={yearData} width={200} height={40} options={options} />
      </div>
      <div className="my-10">
        <div className="relative z-0 mb-6 group flex justify-end">
          <select
            id="months"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => fetchChartData(parseInt(e.target.value), 0)}
          >
            <option selected>Choose month</option>
            {labels.map((label, index) => (
              <option value={label.value} key={index}>
                {label.label}
              </option>
            ))}
          </select>
        </div>
        <Line data={monthData} width={200} height={40} options={options} />
      </div>
    </AdminLayout>
  )
}

export default Dashboard
