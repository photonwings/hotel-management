import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

function History() {
  return (
    <div className="display-container mt-5">
      <InputGroup className="mt-5 pt-5">
        <InputGroup.Text>Start and End Date</InputGroup.Text>
        <Form.Control type="date" className="text-center" />
        <Form.Control type="date" className="text-center" />
      </InputGroup>
    </div>
  )
}

export default History
