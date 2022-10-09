import { Navbar, Nav, Container } from "react-bootstrap"
const NavBar = () => {
  return (
    <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id=" responsive-navbar-nav">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/dash">Dashboard</Nav.Link>
            <Nav.Link href="/billing">Billing</Nav.Link>
            <Nav.Link href="/employee">Payment</Nav.Link>
            <Nav.Link href="/history">Histroy</Nav.Link>
            <Nav.Link className="ms-5" href="/auth">Log-In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavBar
