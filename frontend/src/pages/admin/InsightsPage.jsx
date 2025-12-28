import { BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";
import LoadingComponent from "../../components/LoadingComponent";

export default function InsightsPage() {
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [topItemsData, setTopItemsData] = useState([]);
  const [topCustomersData, setTopCustomersData] = useState([]);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchMonthlySalesData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/insights/get-revenue");
        setMonthlySalesData(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch monthly sales data");
      } finally{
        setLoading(false);
      }
    };

    const fetchTopItemsData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/insights/get-products");
        const data = response.data;
        const total = data.reduce((sum, item) => sum + item.quantity, 0);
        const dataWithPercentage = data.map((item) => ({
          ...item,
          percentage: ((item.quantity / total) * 100).toFixed(2),
        }));
        setTopItemsData(dataWithPercentage);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch top items data");
      } finally{
        setLoading(false);
      }
    };

    const fetchTopCustomersData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/insights/get-customers");
        const data = response.data;
        const total = data.reduce((sum, item) => sum + item.moneySpent, 0);
        const dataWithPercentage = data.map((item) => ({
          ...item,
          percentage: ((item.moneySpent / total) * 100).toFixed(2),
        }));
        setTopCustomersData(dataWithPercentage);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch top employees data");
      } finally{
        setLoading(false);
      }
    };

    fetchMonthlySalesData();
    fetchTopItemsData();
    fetchTopCustomersData();
  }, []);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            ₹{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLabel = (entry) => {
    return `${entry.percentage}%`;
  };

  if(loading){
    return(
      <LoadingComponent message={"Loading insights"}/>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Monthly Sales Overview
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Total sales amount by month (2025)
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlySalesData}>
            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280" }}
              tickLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fill: "#6b7280" }}
              tickLine={{ stroke: "#e5e7eb" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

         {/* Top 5 Customers */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top 5 Employees</h2>
            <p className="text-sm text-gray-500 mt-1">
              Based on total billed amount
            </p>
          </div>

          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topCustomersData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="moneySpent"
                >
                  {topCustomersData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                          <p className="font-semibold text-gray-900">
                            {payload[0].name}
                          </p>
                          <p className="text-sm text-gray-600">
                            ₹{payload[0].value.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            {payload[0].payload.percentage}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-4 w-full space-y-2">
              {topCustomersData.map((customer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-700">
                      {customer.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    ₹{customer.moneySpent.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top 5 Most Sold Items */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Top 5 Most Sold Items
            </h2>
            <p className="text-sm text-gray-500 mt-1">Based on quantity sold</p>
          </div>

          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topItemsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="quantity"
                >
                  {topItemsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                          <p className="font-semibold text-gray-900">
                            {payload[0].name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Units: {payload[0].value}
                          </p>
                          <p className="text-sm text-gray-600">
                            {payload[0].payload.percentage}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-4 w-full space-y-2">
              {topItemsData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {item.quantity} units
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}
