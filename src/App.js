import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import supabase from "./config/supabaseClient"

import Auth from "./components/Auth"
import Home from "./components/Home"
import NavBar from "./components/NavBar"
import Dash from "./components/Dash"
import Billing from "./components/Billing"
import Employee from "./components/Employee"
import History from "./components/History"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/history" element={<History />} />

        {/* <Route path="/" element={} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
