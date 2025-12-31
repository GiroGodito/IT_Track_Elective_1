import { useEffect, useState } from "react";
import api from "../API/axios";
import { jwtDecode } from "jwt-decode";
import {ArrowLeftIcon} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function OrdersPage() {
  interface OrderHistory {
    logID: number;
    orderID: number;
    storename: string;
    logMessage: string;
    timestamp: string;
  }

  interface JWTPayload {
    sub?: string;
    unique_name?: string;
    role?: string;
  }

  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwt");
  const [userName, setUsername] = useState("Guest");

  useEffect(() => {
    api
      .get("/Order/OrderHistory")
      .then((response) => {
        setOrderHistory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<JWTPayload>(token);
      setUsername(decoded.unique_name ?? "Guest");
    }
  }, [token]);

  return (
    <>
    <div className="fixed top-0 left-0 w-screen h-20 m-0 z-50 !bg-primary">
        <div className="flex justify-between m-5">
            <p><strong>{userName !== "Guest" ? `${userName}` : "Guest"}</strong></p>
            <div className="flex gap-5">
              <Link to="/productPage"><ArrowLeftIcon className="h-10 w-10 text-white" /></Link>
            </div>
        </div>
    </div>
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 bg-primary rounded py-5">
        <span>Order History</span>
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : orderHistory.length === 0 ? (
        <p className="text-gray-500">No order history found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="top-0 left-0 bg-white">
            <thead className="bg-primary">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-semibold text-white">
                  Log ID
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-white">
                  Order ID
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-white">
                  Store Name
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-white">
                  Message
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-white">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orderHistory.map((order) => (
                <tr
                  key={order.logID}
                >
                  <td className="px-6 py-4 text-sm text-neutral">
                    {order.logID}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral">
                    {order.orderID}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral">
                    {order.storename}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral">
                    {order.logMessage}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral">
                    {new Date(order.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
}

export default OrdersPage;
