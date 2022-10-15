import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"
import { Table } from "react-bootstrap"

function History() {
  const [bill, setBill] = useState([])
  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase.from("bill").select()
      if (data) {
        // console.log(data)
        setBill(data)
      }
      if (error) {
        console.log(error)
      }
    }
    fetchHistory()
  }, [])

  return (
    <div
      className="display-container"
      style={{ overflow: "scroll", maxHeight: "92vh", marginTop: "3.5em" }}
    >
      <h3 className="bg-secondary text-center text-white py-2 mb-0">
        Bill History
      </h3>
      <Table striped bordered hover variant="dark" className="text-center">
        <thead>
          <tr>
            <th>Bill Id</th>
            <th>Customer Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {bill.map(({ bId, cNumber, dateTime, totalAmount }, index) => (
            <tr key={index}>
              <td>{bId}</td>
              <td>{cNumber ? cNumber : "Customer Deleted"}</td>
              <td>{dateTime.split("T")[0]}</td>
              <td>{dateTime.split("T")[1].slice(0, 8)}</td>
              <td>{totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default History
