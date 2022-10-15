import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"
import { Table } from "react-bootstrap"

function History() {
  const [bill, setBill] = useState([])
  // const [customerNumber, setCustomerNumber] = useState("")
  // const [customerName, setCustomerName] = useState("")
  // const [customerType, setCustomerType] = useState("")
  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase.from("customer").select()
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

  const saveChanges = async (nameId, typeId, cNumber) => {
    const cName = document.getElementById(nameId).value
    const cType = document.getElementById(typeId).value
    const { data, error } = await supabase.from("customer").upsert({
      cNumber: Number(cNumber),
      cName: cName,
      cType: cType,
    })
    if (data) {
      // console.log(data)
    }
    if (error) {
      console.log(error)
    }
    alert(`Updated Record
  Number - ${cNumber}
  Name - ${cName}
  Type - ${cType}`)
  }

  const deleteCustomer = async (currentId) => {
    const removeCustomerBill = await supabase
      .from("bill")
      .update({
        cNumber: null,
      })
      .eq("cNumber", Number(currentId))
    const removeResult = removeCustomerBill.data
    const removeError = removeCustomerBill.error
    if (removeResult) {
      // console.log(removeResult)
    }
    if (removeError) {
      console.log(removeError)
    }
    const { error } = await supabase
      .from("customer")
      .delete()
      .eq("cNumber", currentId)
    if (error) {
      // console.log(error)
    }
    document.getElementById(currentId).remove()
    alert(`Customer ${currentId} deleted`)
  }
  return (
    <div
      className="display-container"
      style={{ overflow: "scroll", maxHeight: "92vh", marginTop: "3.5em" }}
    >
      <h3 className="bg-secondary text-center text-white py-2 mb-0">
        Update and Delete Customer
      </h3>
      <Table
        striped
        bordered
        hover
        variant="dark"
        className="text-center"
        id="tab"
      >
        <thead>
          <tr>
            <th>Customer Nubmer</th>
            <th>Customer Name</th>
            <th>Customer Nummber</th>
            <th>Save Changes</th>
            <th>Delete Customer</th>
          </tr>
        </thead>
        <tbody>
          {bill.map(({ cNumber, cName, cType }, i) => (
            <tr key={cNumber} id={cNumber}>
              <td>
                <input
                  type="text"
                  placeholder="Customer Number"
                  className="text-center"
                  defaultValue={cNumber}
                  readOnly
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Customer Name"
                  className="text-center"
                  defaultValue={cName}
                  // onChange={(e) => setCustomerName(e.target.value)}
                  id={`${cNumber}-name`}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Customer Type"
                  className="text-center"
                  // onChange={(e) => setCustomerType(e.target.value)}
                  defaultValue={cType}
                  id={`${cNumber}-type`}
                />
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  data-mdb-ripple-color="dark"
                  onClick={() =>
                    saveChanges(`${cNumber}-name`, `${cNumber}-type`, cNumber)
                  }
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-mdb-ripple-color="dark"
                  onClick={() => {
                    deleteCustomer(cNumber, i)
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default History
