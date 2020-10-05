import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <h6>Copyright &copy; Neo-Store 2020</h6>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
