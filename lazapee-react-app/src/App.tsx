// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import LoginForm from './Components/Auth/LoginForm'

// function App() {
//   return (
//     <>
//       <LoginForm />
//     </>
//   )
// }

// export default App


//LAST WORKING IMPLEMENTATION
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginForm from "./Components/Pages/LoginForm";
// import RegisterForm from "./Components/Pages/RegisterForm";
// import ProductPage from "./Components/Pages/ProductPage";
// import OrdersPage from "./Components/Pages/OrdersPage";
// import CheckOutForm from "./Components/Pages/CheckOutForm";
// import SellerPage from "./Components/Pages/SellerPage";
// import "./App.css";
// import { useState, useEffect } from "react";
// import api from "./Components/API/axios";

// export default function App() {
//   const [carts, setCarts] = useState<any[]>([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [error, setError] = useState("");
//   const pageSize = 10;

//   // 👇 refreshCarts lives inside App
//   const refreshCarts = async () => {
//     try {
//       const res = await api.get(
//         `/Cart/ViewCart?currentPage=${currentPage}&pageSize=${pageSize}`
//       );
//       setCarts(res.data.data.cartList);
//       setTotalCount(res.data.data.totalCount);

//       if (res.data.data.cartList.length === 0 && currentPage > 1) {
//         setCurrentPage((prev) => prev - 1);
//       }
//     } catch (err) {
//       console.error("Error refreshing carts:", err);
//       setError("Failed to refresh carts");
//     }
//   };

//   useEffect(() => {
//     refreshCarts();
//   }, [currentPage]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/register" element={<RegisterForm />} />
//         <Route path="/productPage" element={<ProductPage />} />
//         <Route path="/orders" element={<OrdersPage />} />
//         <Route path="/sellerDashboard" element={<SellerPage/>}/>
//         {/* 👇 Pass refreshCarts down to CheckOutForm */}
//         <Route
//           path="/checkout/:cartID"
//           element={<CheckOutForm refreshCarts={refreshCarts} />}
//         />
//         <Route path="/" element={<ProductPage />} />
//       </Routes>
//     </Router>
//   );
// }

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Components/Pages/LoginForm";
import RegisterForm from "./Components/Pages/RegisterForm";
import ProductPage from "./Components/Pages/ProductPage";
import OrdersPage from "./Components/Pages/OrdersPage";
import CheckOutForm from "./Components/Pages/CheckOutForm";
import SellerPage from "./Components/Pages/SellerPage";
import "./App.css";
import { useState, useEffect } from "react";
import { authService } from "./Services/AuthService";
import { cartService } from "./Services/CartService";

interface WhoAmIResponse {
  username: string;
  roles: string[];
}

export default function App() {
  const [carts, setCarts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [user, setUser] = useState<WhoAmIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;

  // Refresh carts using cartService
  const refreshCarts = async () => {
    try {
      const data = await cartService.viewCart({ currentPage, pageSize });
      setCarts(data.cartList);
      setTotalCount(data.totalCount);

      if (data.cartList.length === 0 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    } catch (err) {
      console.error("Error refreshing carts:", err);
      setError("Failed to refresh carts");
    }
  };

  useEffect(() => {
    refreshCarts();
  }, [currentPage]);

  // Fetch current user before rendering routes
  useEffect(() => {
    authService
      .whoAmI()
      .then((res) => {
        console.log("whoAmI response:", res); // 👈 Debug: check what roles you get
        setUser(res);
      })
      .catch((err) => {
        console.error("whoAmI failed:", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Default route component
  const DefaultRoute = () => {
    if (loading) return <div>Loading...</div>;

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (user.roles.includes("Seller")) {
      return <Navigate to="/sellerDashboard" replace />;
    }

    if(user.roles.includes("User") && user.roles.length == 1){
      return <Navigate to="/productPage" replace />;
    }

    return <Navigate to="/login" replace />;
  };

  return (
    <Router>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/productPage" element={<ProductPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/sellerDashboard" element={<SellerPage />} />
          <Route
            path="/checkout/:cartID"
            element={<CheckOutForm refreshCarts={refreshCarts} />}
          />
          {/* Default route based on role */}
          <Route path="/" element={<DefaultRoute />} />
        </Routes>
      )}
    </Router>
  );
}
