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
import LoginForm from "./Components/Auth/LoginForm";
import RegisterForm from "./Components/Auth/RegisterForm";
import './App.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* optional default route */}
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}
