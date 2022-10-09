import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export default function App() {
  return (
    <div className="display-container d-flex justify-content-center text-center">
      <Form className="border border-dark border-2 p-5 pt-3 pb-3 rounded">
        <h3>Employee Payment</h3>
        <Form.Group className="p-4">
          <Form.Label>Employee Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Employee Id"
            className="text-center"
          />
        </Form.Group>
        <div className="d-grid">
          <Button className="btn btn-success">Get Details</Button>
        </div>
        <Form.Group className="my-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Amount Paid"
            className="text-center"
          />
        </Form.Group>
        <div className="d-grid">
          <Button className="btn btn-success">Add Amount</Button>
        </div>
      </Form>
    </div>
  )
}
