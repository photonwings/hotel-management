import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export default function App() {
  return (
    <div className="display-container d-flex justify-content-center text-center">
      <Form className="border border-dark border-2 p-5 pt-3 pb-3 rounded">
        <h3>Billing</h3>
        <Form.Group className="p-4">
          <Form.Label>Moblie Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Customer Mobile Number"
            className="text-center"
          />
        </Form.Group>
        <div className="border border-2 border-dark rounded pb-2 px-2 my-3 mt-0">
          <Form.Group className="p-4 pb-0">
            <Form.Label>Dish Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Dish Number"
              className="text-center"
            />
          </Form.Group>
          <Form.Group className="p-4 pt-0">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Dish Quantity"
              className="text-center"
            />
          </Form.Group>
          <div className="d-grid">
            <Button className="btn btn-secondary d-block mb-2">
              Add More Items
            </Button>
          </div>
        </div>
        <div className="d-grid">
          <Button className="btn btn-success">Generate Bill</Button>
        </div>
      </Form>
    </div>
  )
}
