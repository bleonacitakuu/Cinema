import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddTicketModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            selectedMovieID: '', 
            Seat: '',
            Price: ''
        };
    }


    componentDidMount() {
        fetch(process.env.REACT_APP_API + 'movie')
            .then(response => response.json())
            .then(data => {
                this.setState({ movies: data });
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'ticket', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Seat: this.state.Seat,
                Price: this.state.Price,
                MovieID: this.state.selectedMovieID // Dërgimi i ID-së së filmit të përzgjedhur
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');
                });
    }

   handleMovieChange = (event) => {
        this.setState({ selectedMovieID: event.target.value });
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
                            Add ticket
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Seat">
                                        <Form.Label>Seat</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Seat"
                                            required
                                            placeholder="Seat"
                                            value={this.state.Seat}
                                            onChange={(e) => this.setState({ Seat: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Price">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Price"
                                            required
                                            placeholder="Price"
                                            value={this.state.Price}
                                            onChange={(e) => this.setState({ Price: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Movie">
                                        <Form.Label>Movie</Form.Label>
                                        <Form.Control
                                            as="select"
                                            onChange={this.handleMovieChange}
                                            value={this.state.selectedMovieID}
                                            required
                                        >
                                            <option value="">Select a movie</option>
                                            {this.state.movies.map(movie =>
                                                <option key={movie.MovieID} value={movie.MovieID}>{movie.Name}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add
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
        )
    }
}
