import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"
import Table from "react-bootstrap/Table"

const Billing = ({ dishPrice }) => {
  const [customerList, setCustomerList] = useState([])
  const [items, setItems] = useState([])
  const [dishNumber, setDishNumber] = useState("")
  const [quantity, setQuantity] = useState("")
  const [number, setNumber] = useState("")
  const [cName, setCName] = useState("")
  const [cType, setCType] = useState("")
  const [lastBill, setLastBill] = useState(null)
  const [totalAmount, setTotalAmount] = useState(0)
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
    const fetchDishDetails = async () => {}
    fetchCustomers()
    fetchDishDetails()
  }, [])

  const appendToList = (event) => {
    if (!quantity || !dishNumber) {
      alert("Enter Dish Number and Quantity")
      return
    }
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
  const pushBill = async () => {
    let sum = 0
    items.forEach(({ dId, quantity }) => {
      sum += dishPrice[dId - 1].dPrice * quantity
    })
    setTotalAmount(sum)
    const { data, error } = await supabase
      .from("bill")
      .insert({ cNumber: Number(number), totalAmount: sum })
    if (error) {
      console.log(error)
    }
    if (data) {
      setLastBill(data[0])
      setNumber("")
      if (items.length === 0) {
        alert("Enter dish number and quantity")
        return
      }
      let insertList = []
      items.forEach(({ dId, quantity }) => {
        insertList.push({
          bId: Number(data[0].bId),
          dId: Number(dId),
          quantity: Number(quantity),
        })
      })
      const insertToDb = await supabase.from("billList").insert(insertList)
      const d = insertToDb.data
      const e = insertToDb.error
      if (d) {
        setItems([])
        // console.log(data)
      }
      if (e) {
        console.log(error)
      }
    }
  }

  const generateBill = (event) => {
    event.preventDefault()
    if (!number) {
      alert("Enter Moblie Number of Customer")
      return
    }
    if (!customerList.includes(Number(number))) {
      setShowCustomer(true)
    } else {
      pushBill()
    }
  }
  const addCustomer = async (e) => {
    e.preventDefault()
    if (!cType || !cName || !number) {
      alert("Enter Customer name and Customer Type")
      return
    }
    const { data, error } = await supabase
      .from("customer")
      .insert([{ cNumber: Number(number), cName: cName, cType: cType }])
    if (data) {
      alert("Customer Added")
    }
    if (error) {
      console.log(error)
    }
    setCName("")
    setCType("")
    setDishNumber("")
    setQuantity("")
    setNumber("")
    setShowCustomer(false)
    pushBill()
  }

  return (
    <div
      className="min-height"
      style={{ background: "linear-gradient(45deg, black, white)" }}
    >
      <div className="display-container d-flex justify-content-around text-center mt-5 mb-4">
        {showCustomer ? (
          <Form
            className="border border-dark border-2 p-5 pt-3 rounded mt-5"
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
          <div className="justify-content-center">
            <Form
              className="border border-dark border-2 p-5 pt-3 pb-3 rounded mt-5"
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
          </div>
        )}
      </div>
      {lastBill ? (
        <div className="container text-center">
          <Table striped bordered hover>
            <thead>
              <tr className="text-white">
                <th>Bill Id</th>
                <th>Customer Number</th>
                <th>Date</th>
                <th>Time</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-white">{lastBill.bId}</td>
                <td className="text-white">{lastBill.cNumber}</td>
                <td className="text-white">
                  {lastBill.dateTime.split("T")[0]}
                </td>
                <td className="text-white">
                  {lastBill.dateTime.split("T")[1].slice(0, 8)}
                </td>
                <td className="text-white">{lastBill.totalAmount}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : null}
    </div>
  )
}

export default Billing
