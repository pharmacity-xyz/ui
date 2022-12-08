import { Line } from 'react-chartjs-2'

const OrderYearCard = ({ fetchChartData, yearData, options }) => {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5">
        <h1 className="text-lg font-semibold text-slate-800 mb-2">
          Order History
        </h1>
        <div className="relative z-0 mb-6 group flex justify-end">
          <select
            id="years"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => fetchChartData(parseInt(e.target.value), 0)}
          >
            <option value={0}>Choose year</option>
            <option value={2019}>2019</option>
            <option value={2020}>2020</option>
            <option value={2021}>2021</option>
            <option value={2022}>2022</option>
          </select>
        </div>
      </div>

      <Line data={yearData} width={200} height={40} options={options} />
    </div>
  )
}

export default OrderYearCard
