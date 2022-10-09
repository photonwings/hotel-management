import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

function MultipleInputsExample() {
  return (
    <div className="display-container">
      <InputGroup className="mb-3">
        <InputGroup.Text>Start and End Date</InputGroup.Text>
        <Form.Control type="date" className="text-center"/>
        <Form.Control type="date" className="text-center"/>
      </InputGroup>
    </div>
  )
}

export default MultipleInputsExample
