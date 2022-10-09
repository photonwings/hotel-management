import Card from "react-bootstrap/Card"
import React from "react"

const Dash = () => {
  return (
    <div className="display-container d-flex justify-content-around align-items-center">
      <div className="">
        <Card style={{ width: "22rem" }} className="text-center m-5">
          <Card.Body>
            <Card.Title>Total Amount</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">30989</Card.Subtitle>
            {/* <Card.Text>
            GeeksforGeeks provides a platform for all the students to study
            about all the subjects in CSE.
          </Card.Text>
          <Card.Link href="#"> For Students</Card.Link> */}
          </Card.Body>
        </Card>
        <Card style={{ width: "22rem" }} className="text-center m-5">
          <Card.Body>
            <Card.Title>Total Plates</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">2321</Card.Subtitle>
            {/* <Card.Text>
            GeeksforGeeks provides a platform for all the students to study
            about all the subjects in CSE.
          </Card.Text>
          <Card.Link href="#"> For Students</Card.Link> */}
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card style={{ width: "22rem" }} className="text-center m-5">
          <Card.Body>
            <Card.Title>Total Customer Visited</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">2321</Card.Subtitle>
            {/* <Card.Text>
            GeeksforGeeks provides a platform for all the students to study
            about all the subjects in CSE.
          </Card.Text>
          <Card.Link href="#"> For Students</Card.Link> */}
          </Card.Body>
        </Card>
        <Card style={{ width: "22rem" }} className="text-center m-5">
          <Card.Body>
            <Card.Title>Total Dishes Available</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">2321</Card.Subtitle>
            {/* <Card.Text>
            GeeksforGeeks provides a platform for all the students to study
            about all the subjects in CSE.
          </Card.Text>
          <Card.Link href="#"> For Students</Card.Link> */}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Dash
