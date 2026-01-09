// import { useEffect, useState } from "react";
// import api from "../API/axios";
// import { jwtDecode } from "jwt-decode";
// import {ArrowLeftIcon} from "@heroicons/react/24/solid";
// import { Link } from "react-router-dom";

// function OrdersPage() {
//   interface OrderHistory {
//     logID: number;
//     orderID: number;
//     storename: string;
//     logMessage: string;
//     timestamp: string;
//   }

//   interface JWTPayload {
//     sub?: string;
//     unique_name?: string;
//     role?: string;
//   }

//   const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("jwt");
//   const [userName, setUsername] = useState("Guest");

//   useEffect(() => {
//     api
//       .get("/Order/OrderHistory")
//       .then((response) => {
//         setOrderHistory(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching order history:", error);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (token) {
//       const decoded = jwtDecode<JWTPayload>(token);
//       setUsername(decoded.unique_name ?? "Guest");
//     }
//   }, [token]);

//   return (
//     <>
//     <div className="fixed top-0 left-0 w-screen h-20 m-0 z-50 !bg-primary">
//         <div className="flex justify-between m-5">
//             <p><strong>{userName !== "Guest" ? `${userName}` : "Guest"}</strong></p>
//             <div className="flex gap-5">
//               <Link to="/productPage"><ArrowLeftIcon className="h-10 w-10 text-white" /></Link>
//             </div>
//         </div>
//     </div>
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4 bg-primary rounded py-5">
//         <span>Order History</span>
//       </h2>

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : orderHistory.length === 0 ? (
//         <p className="text-gray-500">No order history found.</p>
//       ) : (
//         <div className="overflow-x-auto shadow-md rounded-lg">
//           <table className="top-0 left-0 bg-white">
//             <thead className="bg-primary">
//               <tr>
//                 <th className="px-6 py-3 text-center text-sm font-semibold text-white">
//                   Log ID
//                 </th>
//                 <th className="px-6 py-3 text-center text-sm font-semibold text-white">
//                   Order ID
//                 </th>
//                 <th className="px-6 py-3 text-center text-sm font-semibold text-white">
//                   Store Name
//                 </th>
//                 <th className="px-6 py-3 text-center text-sm font-semibold text-white">
//                   Message
//                 </th>
//                 <th className="px-6 py-3 text-center text-sm font-semibold text-white">
//                   Timestamp
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               {orderHistory.map((order) => (
//                 <tr
//                   key={order.logID}
//                 >
//                   <td className="px-6 py-4 text-sm text-neutral">
//                     {order.logID}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-neutral">
//                     {order.orderID}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-neutral">
//                     {order.storename}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-neutral">
//                     {order.logMessage}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-neutral">
//                     {new Date(order.timestamp).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//     </>
//   );
// }

// export default OrdersPage;



//LAST WORKING IMPLEMENTATION TYPE A SHI
//import { useEffect, useState } from "react";
//import api from "../API/axios";
//import { ArrowLeftIcon } from "@heroicons/react/24/solid";
//import { Link } from "react-router-dom";

//function OrdersPage() {
//  interface OrderItem {
//    orderItemID: number;
//    productID: number;
//    imageUrl: string;
//    name: string;
//    quantity: number;
//    unitPrice: number;
//  }

//  interface OrderDetails {
//    orderID: number;
//    sellerID: number;
//    storeName: string;
//    items: OrderItem[];
//  }

//  interface WhoAmIResponse {
//    username: string;
//    roles: string[];
//  }

// interface ApiResponseOrders {
//   success: boolean;
//   message: string;
//   data: { 
//    totalPendingOrders: number; 
//    pendingOrders: OrderDetails[]; };
// }

//  const [orders, setOrders] = useState<OrderDetails[]>([]);
//  const [totalCount, setTotalCount] = useState<number>(0);
//  const [loading, setLoading] = useState(true);
//  const [user, setUser] = useState<WhoAmIResponse | null>(null);

//  const [currentPage, setCurrentPage] = useState(1);
//  const [pageSize] = useState(2); // show 2 orders per page

//  useEffect(() => {
//    api
//      .get<ApiResponseOrders>(
//        `/Order/GetOrderDetailsOfLoggedInUser?currentPage=${currentPage}&pageSize=${pageSize}`
//      )
//      .then((res) => {
//        setOrders(res.data.data.pendingOrders);
//        setTotalCount(res.data.data.totalPendingOrders);
//        setLoading(false);
//      })
//      .catch((error) => {
//        console.error("Error fetching order details:", error);
//        setLoading(false);
//      });
//  }, [currentPage, pageSize]);

//  useEffect(() => {
//    api
//      .get<WhoAmIResponse>("/Auth/whoAmI")
//      .then((res) => setUser(res.data))
//      .catch(() => setUser(null));
//  }, []);

//  const totalPages = Math.ceil(totalCount / pageSize);

//  return (
//    <>
//      {/* Header */}
//      <div className="fixed top-0 left-0 w-screen h-20 m-0 z-50 bg-primary">
//        <div className="flex justify-between m-5 text-white">
//          <p>
//            <strong>{user ? user.username : "Guest"}</strong>
//          </p>
//          <div className="flex gap-5">
//            <Link to="/productPage">
//              <ArrowLeftIcon className="h-10 w-10 text-white" />
//            </Link>
//          </div>
//        </div>
//      </div>

//      {/* Orders */}
//      <div className="p-6 mt-24">
//        <h2 className="text-2xl font-semibold mb-6 text-white">To Pay</h2>

//        {loading ? (
//          <p className="text-gray-400">Loading...</p>
//        ) : orders.length === 0 ? (
//          <p className="text-gray-400">No orders found.</p>
//        ) : (
//          <div className="space-y-6">
//            {orders.map((order) => {
//              const grandTotal = order.items.reduce(
//                (sum, item) => sum + item.unitPrice * item.quantity,
//                0
//              );

//              return (
//                <div
//                  key={order.orderID}
//                  className="border rounded-lg p-6 shadow-md bg-gray-800 text-gray-100 border-white"
//                >
//                  <h3 className="text-xl font-semibold mb-4">
//                    <span className="text-accent">{order.storeName} Store</span>{" "}
//                  </h3>

//                  {/* Table */}
//                  <div className="overflow-x-auto">
//                    <table className="min-w-full border border-gray-700 rounded-lg">
//                      <thead className="bg-gray-700 text-gray-200">
//                        <tr>
//                          <th className="px-4 py-2 text-center">Image</th>
//                          <th className="px-4 py-2 text-center">Name</th>
//                          <th className="px-4 py-2 text-center">Quantity</th>
//                          <th className="px-4 py-2 text-center">Unit Price</th>
//                          <th className="px-4 py-2 text-center">Line Total</th>
//                        </tr>
//                      </thead>
//                      <tbody>
//                        {order.items.map((item) => (
//                          <tr
//                            key={item.orderItemID}
//                            className="border-t border-gray-700 transition"
//                          >
//                            <td className="px-4 py-2 text-center">
//                              <img
//                                src={item.imageUrl}
//                                alt={item.name}
//                                className="w-16 h-16 object-cover mx-auto rounded"
//                              />
//                            </td>
//                            <td className="px-4 py-2">{item.name}</td>
//                            <td className="px-4 py-2 text-center">
//                              {item.quantity}
//                            </td>
//                            <td className="px-4 py-2 text-center">
//                              ₱{item.unitPrice.toLocaleString()}
//                            </td>
//                            <td className="px-4 py-2 text-center font-medium">
//                              ₱{(item.unitPrice * item.quantity).toLocaleString()}
//                            </td>
//                          </tr>
//                        ))}
//                      </tbody>
//                    </table>
//                  </div>

//                  {/* Grand Total */}
//                  <div className="text-right font-semibold mt-4">
//                    Grand Total:{" "}
//                    <span className="text-accent">
//                      ₱{grandTotal.toLocaleString()}
//                    </span>
//                  </div>
//                </div>
//              );
//            })}
//          </div>
//        )}

//        {/* Pagination controls */}
//        {orders.length > 0 && (
//          <div className="flex justify-center mt-6 gap-2 text-white">
//            <button
//              className="btn"
//              disabled={currentPage === 1}
//              onClick={() => setCurrentPage((prev) => prev - 1)}
//            >
//              Prev
//            </button>
//            <span className="px-4 py-2">
//              Page {currentPage} of {totalPages}
//            </span>
//            <button
//              className="btn"
//              disabled={currentPage === totalPages}
//              onClick={() => setCurrentPage((prev) => prev + 1)}
//            >
//              Next
//            </button>
//          </div>
//        )}
//      </div>
//    </>
//  );
//}

//export default OrdersPage;
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { orderService } from "../../Services/OrderService";
import { authService } from "../../Services/AuthService";

function OrdersPage() {
    interface OrderItem {
        orderItemID: number;
        productID: number;
        imageUrl: string;
        name: string;
        quantity: number;
        unitPrice: number;
    }

    interface OrderDetails {
        orderID: number;
        sellerID: number;
        storeName: string;
        items: OrderItem[];
    }

    interface WhoAmIResponse {
        username: string;
        roles: string[];
    }

    const [orders, setOrders] = useState<OrderDetails[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<WhoAmIResponse | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(2); // show 2 orders per page

    // ✅ Fetch orders using orderService
    useEffect(() => {
        orderService
            .getOrderDetails({ currentPage, pageSize })
            .then((data) => {
                setOrders(data.pendingOrders);
                setTotalCount(data.totalPendingOrders);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching order details:", error);
                setLoading(false);
            });
    }, [currentPage, pageSize]);

    // ✅ Fetch user info using authService
    useEffect(() => {
        authService
            .whoAmI()
            .then((res) => setUser(res))
            .catch(() => setUser(null));
    }, []);

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <>
            {/* Header */}
            <div className="fixed top-0 left-0 w-screen h-20 m-0 z-50 bg-primary">
                <div className="flex justify-between m-5 text-white">
                    <p>
                        <strong>{user ? user.username : "Guest"}</strong>
                    </p>
                    <div className="flex gap-5">
                        <Link to="/productPage">
                            <ArrowLeftIcon className="h-10 w-10 text-white" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Orders */}
            <div className="p-6 mt-24">
                <h2 className="text-2xl font-semibold mb-6 text-white">To Pay</h2>

                {loading ? (
                    <p className="text-gray-400">Loading...</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-400">No orders found.</p>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const grandTotal = order.items.reduce(
                                (sum, item) => sum + item.unitPrice * item.quantity,
                                0
                            );

                            return (
                                <div
                                    key={order.orderID}
                                    className="border rounded-lg p-6 shadow-md bg-gray-800 text-gray-100 border-white"
                                >
                                    <h3 className="text-xl font-semibold mb-4">
                                        <span className="text-accent">{order.storeName} Store</span>{" "}
                                    </h3>

                                    {/* Table */}
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border border-gray-700 rounded-lg">
                                            <thead className="bg-gray-700 text-gray-200">
                                                <tr>
                                                    <th className="px-4 py-2 text-center">Image</th>
                                                    <th className="px-4 py-2 text-center">Name</th>
                                                    <th className="px-4 py-2 text-center">Quantity</th>
                                                    <th className="px-4 py-2 text-center">Unit Price</th>
                                                    <th className="px-4 py-2 text-center">Line Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items.map((item) => (
                                                    <tr
                                                        key={item.orderItemID}
                                                        className="border-t border-gray-700 transition"
                                                    >
                                                        <td className="px-4 py-2 text-center">
                                                            <img
                                                                src={item.imageUrl}
                                                                alt={item.name}
                                                                className="w-16 h-16 object-cover mx-auto rounded"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2">{item.name}</td>
                                                        <td className="px-4 py-2 text-center">
                                                            {item.quantity}
                                                        </td>
                                                        <td className="px-4 py-2 text-center">
                                                            ₱{item.unitPrice.toLocaleString()}
                                                        </td>
                                                        <td className="px-4 py-2 text-center font-medium">
                                                            ₱{(item.unitPrice * item.quantity).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Grand Total */}
                                    <div className="text-right font-semibold mt-4">
                                        Grand Total:{" "}
                                        <span className="text-accent">
                                            ₱{grandTotal.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination controls */}
                {orders.length > 0 && (
                    <div className="flex justify-center mt-6 gap-2 text-white">
                        <button
                            className="btn"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                            Prev
                        </button>
                        <span className="px-4 py-2">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="btn"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default OrdersPage;
