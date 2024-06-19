import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import AddContactFormModal from "./AddContactFormModal";

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactForms: [],
      addModalShow: false,
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "contactform")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ contactForms: data });
      });
  }

  deleteForm(id) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "contactform/" + id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((result) => {
          alert(result);
          this.refreshList();
        });
    }
  }

  renderTableData() {
    return this.state.contactForms.map((form) => {
      const { Id, Name, Email, message } = form;
      return (
        <tr key={Id}>
          <td>{Id}</td>
          <td>{Name}</td>
          <td>{Email}</td>
          <td>{message}</td>
          <td>
            <ButtonToolbar>
              <Button
                className="mr-2"
                variant="danger"
                onClick={() => this.deleteForm(Id)}
              >
                Delete
              </Button>
            </ButtonToolbar>
          </td>
        </tr>
      );
    });
  }

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });

    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>

        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Contact Form
          </Button>
          <AddContactFormModal
            show={this.state.addModalShow}
            onHide={addModalClose}
            refreshList={() => this.refreshList()}
          />
        </ButtonToolbar>
      </div>
    );
  }
}

export default ContactForm;
