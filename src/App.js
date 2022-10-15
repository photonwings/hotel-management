import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import supabase from "./config/supabaseClient"

import Auth from "./components/Auth"
import Home from "./components/Home"
import Dash from "./components/Dash"
import Billing from "./components/Billing"
import Employee from "./components/Employee"
import History from "./components/History"
import WithoutNav from "./components/WithoutNav"
import WithNav from "./components/WithNav"
import Edit from "./components/Edit"

function App() {
  const [dishPrice, setDishPrice] = useState([])
  useEffect(() => {
    const fetchDish = async () => {
      const { data, error } = await supabase.from("dish").select("dPrice")
      if (data) {
        // console.log(data[0].dPrice)
        setDishPrice(data)
      }
      if (error) {
        console.log(error)
      }
    }
    fetchDish()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
        <Route element={<WithNav />}>
          <Route path="/dash" element={<Dash />} />
          <Route path="/billing" element={<Billing dishPrice={dishPrice} />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/history" element={<History />} />
          <Route path="/edit" element={<Edit />} />
        </Route>
        {/* <Route path="/" element={} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
