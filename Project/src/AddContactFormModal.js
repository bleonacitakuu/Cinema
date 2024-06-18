import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

class AddContactFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + 'contactform', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name: event.target.Name.value,
        Email: event.target.Email.value,
        message: event.target.message.value
      })
    })
      .then(res => res.json())
      .then((result) => {
        alert(result);
        this.props.refreshList();
      },
        (error) => {
          alert('Failed');
        });
  }

  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Contact Form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="Name" required placeholder="Name" />
                  </Form.Group>
                  <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="Email" required placeholder="Email" />
                  </Form.Group>
                  <Form.Group controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" name="message" required placeholder="Message" />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Add Contact Form
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddContactFormModal;
