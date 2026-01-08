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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/Pages/LoginForm";
import RegisterForm from "./Components/Pages/RegisterForm";
import ProductPage from "./Components/Pages/ProductPage";
import OrdersPage from "./Components/Pages/OrdersPage";
import CheckOutForm from "./Components/Pages/CheckOutForm";
import "./App.css";
import { useState, useEffect } from "react";
import api from "./Components/API/axios";

export default function App() {
  const [carts, setCarts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const pageSize = 10;

  // 👇 refreshCarts lives inside App
  const refreshCarts = async () => {
    try {
      const res = await api.get(
        `/Cart/ViewCart?currentPage=${currentPage}&pageSize=${pageSize}`
      );
      setCarts(res.data.data.cartList);
      setTotalCount(res.data.data.totalCount);

      if (res.data.data.cartList.length === 0 && currentPage > 1) {
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

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/productPage" element={<ProductPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        {/* 👇 Pass refreshCarts down to CheckOutForm */}
        <Route
          path="/checkout/:cartID"
          element={<CheckOutForm refreshCarts={refreshCarts} />}
        />
        <Route path="/" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

