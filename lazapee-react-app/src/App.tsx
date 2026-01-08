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
import './App.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/productPage" element={<ProductPage/>}/>
        <Route path="/orderHistory" element={<OrdersPage/>}/>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}
