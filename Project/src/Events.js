import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { AddEventModal } from "./AddEventModal";

export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [], addModalShow: false };

    this.refreshList = this.refreshList.bind(this);
    this.delete = this.delete.bind(this);
  }
  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "events")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ events: data });
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }

  delete(eventID) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "events/" + eventID, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList(); // Refresh list after successful delete
          },
          (error) => {
            alert("Failed to delete");
          }
        );
    }
  }

  render() {
    const { events, addModalShow } = this.state;

    return (
      <div>
        <div className="container">
          <h3 className="m-3 d-flex justify-content-center">Events</h3>
        </div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Image</th>
              <th>Movie</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.EventID}>
                <td>{event.EventID}</td>
                <td>{event.Title}</td>
                <td>
                  <img
                    src={process.env.REACT_APP_PHOTOPATH + event.Image}
                    alt={event.Title}
                    width="100px"
                  />
                </td>
                <td>{event.Movie}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.delete(event.EventID)}
                    >
                      Delete
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add a new event
          </Button>

          <AddEventModal
            show={addModalShow}
            onHide={() => this.setState({ addModalShow: false })}
            refreshList={this.refreshList} // Pass refreshList function to modal
          />
        </ButtonToolbar>
      </div>
    );
  }
}

