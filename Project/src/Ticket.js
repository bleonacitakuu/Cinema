import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { AddTicketModal } from './AddTicketModal';

export class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            addModalShow: false
        };
        this.fetchController = new AbortController(); 
    }

 componentDidMount() {
        this.refreshList();
    }

    componentWillUnmount() {
        this.fetchController.abort();
    }

   refreshList() {
        fetch(process.env.REACT_APP_API + 'ticket', {
            signal: this.fetchController.signal 
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ tickets: data });
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Fetch error:', error);
                }
            });
    }

   deleteTicket(ticketID) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'ticket/' + ticketID, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    this.refreshList(); 
                }
            });
        }
    }

       calculateTotalPrice() {
        const { tickets } = this.state;
        let totalPrice = 0;
        tickets.forEach(ticket => {
            totalPrice += ticket.Price;
        });
        return totalPrice.toFixed(2); 
    }

    render() {
        const { tickets, addModalShow } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });

        return (
            <div>
                <div className="container">
                    <h3 className="m-3 d-flex justify-content-center">
                        Ticket
                    </h3>
                </div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Seat</th>
                            <th>Movie</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket =>
                            <tr key={ticket.TicketID}>
                                <td>{ticket.TicketID}</td>
                                <td>{ticket.Seat}</td>
                                <td>{ticket.Movie}</td>
                                <td>{ticket.Price}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteTicket(ticket.TicketID)}>
                                            Delete
                                        </Button>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3"></td>
                            <td>Total:</td>
                            <td>{this.calculateTotalPrice()}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Ticket
                    </Button>
                    <AddTicketModal show={addModalShow} onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        );
    }
}

