import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import supabase from "../config/supabaseClient"
import { Table } from "react-bootstrap"

export default function App() {
  const [employees, setEmployees] = useState([])
  const [employeesPayment, setEmployeesPayment] = useState([])
  const [employeeDetails, setEmployeeDetails] = useState({})
  const [amount, setAmount] = useState("")
  const [updateEId, setUpdateEId] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [enteredEId, setEnteredEId] = useState("")

  useEffect(() => {
    const fetchEmployee = async () => {
      let employeesList = []
      const { data, error } = await supabase.from("employee").select()
      if (data) {
        // console.log(data)
        data.forEach(({ eId, eName, eNumber }) => {
          employeesList.push({ eId, eName, eNumber })
        })
        setEmployees(employeesList)
      }
      if (error) {
        console.log(error)
      }
    }
    const fetchEmployeePayment = async () => {
      let employeesPaymentList = []
      const { data, error } = await supabase.from("employeePayment").select()
      if (data) {
        // console.log(data)
        data.forEach(({ eId, pMonth, pStatus, amount }) => {
          employeesPaymentList.push({ eId, pMonth, pStatus, amount })
        })
        setEmployeesPayment(employeesPaymentList)
        // console.log(employeesPaymentList)
      }
      if (error) {
        console.log(error)
      }
    }
    fetchEmployeePayment()
    fetchEmployee()
  }, [employeeDetails])
  const getDetails = () => {
    if (!enteredEId) {
      alert("Enter employee Id")
      return
    }
    const currentMonth = new Date().toDateString().slice(4, 7).toLowerCase()
    let isId = false
    employees.forEach(({ eId, eName, eNumber }) => {
      if (enteredEId === eId) {
        isId = true
        employeesPayment.forEach(({ eId, pMonth, pStatus, amount }) => {
          if (eId === enteredEId && pMonth === currentMonth) {
            setEmployeeDetails({ eId, eName, eNumber, pMonth, pStatus, amount })
            setIsChecked(true)
            setUpdateEId(eId)
          }
        })
        return
      }
    })
    if (!isId) {
      isId = true
      alert("Employee Id not found")
    }
  }

  const addAmount = async () => {
    if (!amount || !isChecked) {
      alert("Enter employee Id and check employee payment status")
      return
    }
    const { data, error } = await supabase
      .from("employeePayment")
      .update({ amount: Number(amount), pStatus: true })
      .match({
        eId: updateEId,
        pMonth: new Date().toDateString().slice(4, 7).toLowerCase(),
      })

    if (data) {
      console.log(data)
      setEmployeeDetails({})
      setEnteredEId("")
      setAmount("")
      alert("Payment done")
    }
    if (error) {
      console.log(error)
    }
  }

  return (
    <div
      className="min-height"
      style={{ background: "linear-gradient(45deg, black, white)" }}
    >
      <div className="display-container d-flex justify-content-center text-center">
        <Form
          className="border border-dark border-2 p-5 pt-3 pb-3 rounded mt-5"
          style={{ backgroundColor: "#adadad" }}
        >
          <h3>Employee Payment</h3>
          <Form.Group className="p-4">
            <Form.Label>Employee Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Employee Id"
              className="text-center"
              onChange={(e) => {
                setEnteredEId(e.target.value)
              }}
              value={enteredEId}
            />
          </Form.Group>
          <div className="d-grid">
            <Button className="btn btn-secondary" onClick={getDetails}>
              Get Details
            </Button>
          </div>
          <Form.Group className="my-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Amount"
              className="text-center"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid">
            <Button className="btn btn-secondary" onClick={addAmount}>
              Add Amount
            </Button>
          </div>
        </Form>
      </div>
      {Object.keys(employeeDetails).length === 0 ? null : (
        <div className="container text-center mt-5">
          <Table striped bordered hover>
            <thead>
              <tr className="text-white">
                <th>Employee Id</th>
                <th>Employee Name</th>
                <th>Employee Number</th>
                <th>Month</th>
                <th>Payment Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-white">{employeeDetails.eId}</td>
                <td className="text-white">{employeeDetails.eName}</td>
                <td className="text-white">{employeeDetails.eNumber}</td>
                <td className="text-white">{employeeDetails.pMonth}</td>
                <td className="text-white">
                  {!employeeDetails.pStatus ? "Not Paid" : "Paid"}
                </td>
                <td className="text-white">{employeeDetails.amount}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  )
}
