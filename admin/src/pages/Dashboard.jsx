import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const loadDashboard = async () => {
    try {
      const productRes = await axios.get(
        backendUrl + "/api/product/list"
      );

      const orderRes = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (productRes.data.success && orderRes.data.success) {
        const orders = orderRes.data.orders;

        setStats({
          products: productRes.data.products.length,
          orders: orders.length,
          revenue: orders.reduce(
            (sum, order) => sum + order.amount,
            0
          ),
          pending: orders.filter(
            (order) => order.status !== "Delivered"
          ).length,
        });

        setRecentOrders(orders.slice(0, 5));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-[#4B072B] mb-8">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Products</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.products}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Orders</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.orders}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold mt-2">
            {currency}
            {stats.revenue}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Pending Orders</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.pending}
          </h2>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow mt-10 p-6">

        <h2 className="text-xl font-semibold mb-5">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">Customer</th>

                <th className="text-left py-3">Amount</th>

                <th className="text-left py-3">Payment</th>

                <th className="text-left py-3">Status</th>

              </tr>

            </thead>

            <tbody>

              {recentOrders.map((order) => (
                <tr key={order._id} className="border-b">

                  <td className="py-3">
                    {order.address.firstName}{" "}
                    {order.address.lastName}
                  </td>

                  <td>
                    {currency}
                    {order.amount}
                  </td>

                  <td>{order.paymentMethod}</td>

                  <td>{order.status}</td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;