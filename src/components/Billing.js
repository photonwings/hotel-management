import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"

export default function App() {
  const [customerList, setCustomerList] = useState([])
  const [items, setItems] = useState([])
  const [dishNumber, setDishNumber] = useState("")
  const [quantity, setQuantity] = useState("")
  const [number, setNumber] = useState("")
  const [cName, setCName] = useState("")
  const [cType, setCType] = useState("")
  const [showCustomer, setShowCustomer] = useState(false)

  useEffect(() => {
    const fetchCustomers = async () => {
      let list = []
      const { data, error } = await supabase.from("customer").select("cNumber")
      if (data) {
        for (let i = 0; i < data.length; i++) {
          list.push(data[i].cNumber)
        }
        setCustomerList(list)
      }
    }
    fetchCustomers()
  }, [])

  const appendToList = (event) => {
    event.preventDefault()
    setItems((prevFriends) => [
      ...prevFriends,
      {
        dId: Number(dishNumber),
        quantity: Number(quantity),
      },
    ])
    setDishNumber("")
    setQuantity("")
  }
  const pushBill = () => {
    // push bill to db
  }

  const generateBill = (event) => {
    event.preventDefault()
    if (!customerList.includes(Number(number))) {
      setShowCustomer(true)
    } else {
      pushBill()
    }
  }

  const addCustomer = () => {
    // push customer to db
  }

  return (
    <div className="display-container d-flex justify-content-around text-center">
      {showCustomer ? (
        <Form
          className="border border-dark border-2 p-5 pt-3 rounded"
          style={{ backgroundColor: "#adadad" }}
        >
          <h3>Add Customer</h3>
          <Form.Group className="p-4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Customer Name"
              className="text-center"
              onChange={(e) => setCName(e.target.value)}
              value={cName}
            />
          </Form.Group>
          <Form.Group className="p-4 pt-0">
            <Form.Label>Customer Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Customer Type"
              className="text-center"
              onChange={(e) => setCType(e.target.value)}
              value={cType}
            />
          </Form.Group>
          <div className="d-grid">
            <Button className="btn btn-secondary" onClick={addCustomer}>
              Add Customer
            </Button>
          </div>
        </Form>
      ) : (
        <Form
          className="border border-dark border-2 p-5 pt-3 pb-3 rounded"
          style={{ backgroundColor: "#adadad" }}
        >
          <h3>Billing</h3>
          <Form.Group className="p-4">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Customer Mobile Number"
              className="text-center"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />
          </Form.Group>
          <div
            className="border border-2 border-dark rounded pb-2 px-2 my-3 mt-0"
            style={{ backgroundColor: "lightgray" }}
          >
            <Form.Group className="p-4 pb-0">
              <Form.Label>Dish Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Dish Number"
                className="text-center"
                onChange={(e) => setDishNumber(e.target.value)}
                value={dishNumber}
              />
            </Form.Group>
            <Form.Group className="p-4 pt-0">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Dish Quantity"
                className="text-center"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
            </Form.Group>
            <div className="d-grid">
              <Button
                className="btn btn-secondary d-block mb-2"
                onClick={appendToList}
              >
                Add More Items
              </Button>
            </div>
          </div>
          <div className="d-grid">
            <Button className="btn btn-secondary" onClick={generateBill}>
              Generate Bill
            </Button>
          </div>
        </Form>
      )}
    </div>
  )
}
