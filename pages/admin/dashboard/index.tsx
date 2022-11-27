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
import { getOrdersForAdminApi } from '../../../services/order/orderServices'

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

const data = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3, 0.4, 0.5, 0.2, 0.1],
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
      fill: 'start',
      backgroundColor: 'rgba(47, 97, 68, 0.3)',
    },
    point: {
      radius: 0,
      hitRadius: 0,
    },
  },
  scales: {
    xAxis: {
      display: false,
    },
    yAxis: {
      display: false,
    },
  },
}

const Dashboard = () => {
const [monthData, setMonthData] = useState(Array<number>(12).fill(0))
  const fetchAllOrders = async () => {
    try {
      let token = localStorage.getItem('token')
      const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      }
      const res = await getOrdersForAdminApi(config)

      res.data.forEach(order => {
        const month = new Date(order.orderDate).getUTCMonth() 
        console.log(monthData[month-1])
        monthData[month-1] += 1
        // console.log(month)
      });
      setMonthData(monthData)
    //   console.log(monthData)
      //   setOrders(res.data)
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }
  }

  useEffect(() => {
    // console.log(monthData[11])
    fetchAllOrders()
      console.log(monthData)
  }, [])

  return (
    <AdminLayout title="Dashboard">
      <Line data={data} width={100} height={40} options={options} />
    </AdminLayout>
  )
}

export default Dashboard
