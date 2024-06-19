import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { AddMovieCategoriesModal } from "./AddMovieCategoriesModal";
import { EditMovieCategoriesModal } from "./EditMovieCategoriesModal";

export class MovieCategories extends Component {
  constructor(props) {
    super(props);
    this.state = { Categories: [], addModalShow: false, editModalShow: false };
    this.fetchController = new AbortController(); 
  }

  componentDidMount() {
    this.refreshList();
  }

  componentWillUnmount() {
    this.fetchController.abort(); // Anulo kërkesën në rast të zhdukjes së komponentit
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "moviecategories", {
      signal: this.fetchController.signal, 
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Categories: data });
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted"); // Mund të shtoni rastet kur kërkesa anulohet
        } else {
          console.error("Fetch error:", error);
        }
      });
  }

  delete(CID) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "moviecategories/" + CID, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }

  render() {
    const { Categories, CID, Name } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <div className="container">
          <h3 className="m-3 d-flex justify-content-center">
            Movie Categories
          </h3>
        </div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {Categories.map((Category) => (
              <tr key={Category.CID}>
                <td>{Category.CID}</td>
                <td>{Category.Name}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          CID: Category.CID,
                          Name: Category.Name,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.delete(Category.CID)}
                    >
                      Delete
                    </Button>
                    <EditMovieCategoriesModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      CID={CID}
                      Name={Name}
                    />
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
            Add
          </Button>
          <AddMovieCategoriesModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>

        {/* Tabela shtesë për kategoritë e filmave */}
        <div className="container mt-5">
          <h4 className="m-3 d-flex justify-content-center">
            List of Movie Categories
          </h4>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Drama</td>
              </tr>
              <tr>
                <td>Horror</td>
              </tr>
              <tr>
                <td>Comedy</td>
              </tr>
              <tr>
                <td>Action</td>
              </tr>
              <tr>
                <td>Romance</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}



