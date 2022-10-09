import Card from "react-bootstrap/Card"
import React from "react"
import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"

const Dash = () => {
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalPlate, setTotalPlate] = useState(0)
  const [totalCustomer, setTotalCustomer] = useState(0)
  const [totalDishes, setTotalDishes] = useState(0)
  useEffect(() => {
    const fetchAmount = async () => {
      let total = 0
      const { data, error } = await supabase.from("bill").select("totalAmount")
      if (data) {
        for (let i = 0; i < data.length; i++) {
          total += data[i].totalAmount
        }
        setTotalAmount(total)
      }
      if (error) {
        console.log(error)
      }
    }
    const fetchPlate = async () => {
      let total = 0
      const { data, error } = await supabase.from("billList").select("quantity")
      if (data) {
        for (let i = 0; i < data.length; i++) {
          total += data[i].quantity
        }
        setTotalPlate(total)
      }
      if (error) {
        console.log(error)
      }
    }
    const fetchCustomer = async () => {
      const { data, error } = await supabase.from("customer").select("cNumber")

      if (data) {
        setTotalCustomer(data.length)
      }
      if (error) {
        console.log(error)
      }
    }
    const fetchDishes = async () => {
      const { data, error } = await supabase.from("dish").select("dId")

      if (data) {
        setTotalDishes(data.length)
      }
      if (error) {
        console.log(error)
      }
    }
    fetchAmount()
    fetchPlate()
    fetchCustomer()
    fetchDishes()
  }, [])
  return (
    <div className="display-container d-flex justify-content-around align-items-center">
      <div className="">
        <Card
          style={{ width: "22rem", backgroundColor: "lightgray" }}
          className="text-center m-5"
        >
          <Card.Body>
            <Card.Title>Total Amount</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {totalAmount}
            </Card.Subtitle>
          </Card.Body>
        </Card>
        <Card
          style={{ width: "22rem", backgroundColor: "lightgray" }}
          className="text-center m-5"
        >
          <Card.Body>
            <Card.Title>Total Plates</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {totalPlate}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card
          style={{ width: "22rem", backgroundColor: "lightgray" }}
          className="text-center m-5"
        >
          <Card.Body>
            <Card.Title>Total Customer Visited</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {totalCustomer}
            </Card.Subtitle>
          </Card.Body>
        </Card>
        <Card
          style={{ width: "22rem", backgroundColor: "lightgray" }}
          className="text-center m-5"
        >
          <Card.Body>
            <Card.Title>Total Dishes Available</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {totalDishes}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Dash
