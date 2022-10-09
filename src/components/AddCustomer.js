import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"

const AddCustomer = () => {
  return (
    <div className="display-container d-flex justify-content-center text-center">
      <Form
        className="border border-dark border-2 p-5 pt-3 rounded"
        style={{ backgroundColor: "#adadad" }}
      >
        {" "}
        <h3>Add Customer</h3>
        <Form.Group className="p-4">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Customer Name"
            className="text-center"
            // onChange={(e) => setNumber(e.target.value)}
            // value={number}
          />
        </Form.Group>
        <Form.Group className="p-4 pt-0">
          <Form.Label>Customer Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Customer Type"
            className="text-center"
            // onChange={(e) => setNumber(e.target.value)}
            // value={number}
          />
        </Form.Group>
        <div className="d-grid">
          <Button className="btn btn-secondary">Add Customer</Button>
        </div>
      </Form>
    </div>
  )
}

export default AddCustomer
