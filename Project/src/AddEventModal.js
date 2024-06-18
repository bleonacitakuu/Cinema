import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";

export class AddEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = { Title: "", Movie: "", Image: null, ImageSrc: null };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Title", this.state.Title);
    formData.append("Movie", this.state.Movie);
    formData.append("Image", this.state.Image);

    fetch(process.env.REACT_APP_API + "events", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.props.onHide(); 
          this.props.refreshList(); 
        },
        (error) => {
          alert("Failed to add event");
        }
      );
  }

  handleFileSelected(event) {
    const file = event.target.files[0];
    this.setState({
      Image: file,
      ImageSrc: URL.createObjectURL(file), 
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
              Add Event
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="Title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="Title"
                      value={this.state.Title}
                      onChange={(e) => this.setState({ Title: e.target.value })}
                      required
                      placeholder="Title"
                    />
                  </Form.Group>
                  <Form.Group controlId="Movie">
                    <Form.Label>Movie</Form.Label>
                    <Form.Control
                      type="text"
                      name="Movie"
                      value={this.state.Movie}
                      onChange={(e) => this.setState({ Movie: e.target.value })}
                      required
                      placeholder="Movie"
                    />
                  </Form.Group>
                  <Form.Group controlId="Image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={this.handleFileSelected}
                      accept="image/*"
                      required
                    />
                    {this.state.ImageSrc && (
                      <Image
                        src={this.state.ImageSrc}
                        alt="Selected"
                        className="mt-2"
                        thumbnail
                      />
                    )}
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
