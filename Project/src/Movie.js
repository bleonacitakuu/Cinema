import React, { Component } from "react";
import { Table, Button, ButtonToolbar, Card, Container, Row, Col } from "react-bootstrap";
import { AddMovieModal } from "./AddMovieModal";
import { EditMovieModal } from "./EditMovieModal";
import TheSuicideSquad from "./img/The Suicide Squad.jpg";
import FastAndFurious from "./img/Fast and Furious.jpg";
import BlackWidow from "./img/BlackWidow.jpg";
import HomeAlone from "./img/Home Alone.jpg";
import HachiADog from "./img/Hachi_A_Dog.jpg";
import Theforever from "./img/The Forever Purge.jpg";
import HomeAlone2 from "./img/Home Alone 2.jpg";
import SpongeBob from "./img/SpongeBob.jpg";

const cardStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  margin: "10px",
};

export class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      addModalShow: false,
      editModalShow: false,
      
      MovieID: null,
      Name: "",
      Categories: "",
      Price: "",
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "movie")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movies: data });
      });
  }

  deleteMovie = (MovieID) => {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "movie/" + MovieID, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(() => {
        // Refresh list after deletion
        this.refreshList();
      });
    }
  };

  handleEditClick = (Movie) => {
    this.setState({
      editModalShow: true,
      MovieID: Movie.MovieID,
      Name: Movie.Name,
      Categories: Movie.Categories,
      Price: Movie.Price,
    });
  };

  render() {
    const { movies, MovieID, Name, Categories, Price } = this.state;

    const moviePosters = {
      "Suicide Squad": TheSuicideSquad,
      "Black Widow": BlackWidow,
      "Fast and Furious": FastAndFurious,
      "Home Alone": HomeAlone,
      "Hachi A Dog": HachiADog,
      "The Forever Purge": Theforever,
      "Home Alone 2" : HomeAlone2,
      "Sponge Bob" : SpongeBob
    };
  
    const defaultMovies = [
      { MovieID: 1, Name: "Suicide Squad" },
      { MovieID: 2, Name: "Black Widow" },
      { MovieID: 3, Name: "Fast and Furious" },
      { MovieID: 4, Name: "Home Alone" },
      { MovieID: 5, Name: "Hachi A Dog" },
      { MovieID: 6, Name: "The Forever Purge" },
      { MovieID: 7, Name: "Home Alone 2" },
      { MovieID: 8, Name: "Sponge Bob" }
    ];

    const displayMovies = movies.length >= 8 ? movies.slice(0, 8) : defaultMovies;

    return (
      <div className="page-background"> {/*  */}
        <div className="container">
          <h3 className="m-3 d-flex justify-content-center">Movies</h3>
        </div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Categories</th>
              <th>Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((Movie) => (
              <tr key={Movie.MovieID}>
                <td>{Movie.MovieID}</td>
                <td>{Movie.Name}</td>
                <td>{Movie.Categories}</td>
                <td>{Movie.Price}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() => this.handleEditClick(Movie)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deleteMovie(Movie.MovieID)}
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
            Add Movie
          </Button>
          <AddMovieModal
            show={this.state.addModalShow}
            onHide={() => this.setState({ addModalShow: false })}
          />
          <EditMovieModal
            show={this.state.editModalShow}
            onHide={() => this.setState({ editModalShow: false })}
            MovieID={MovieID}
            Name={Name}
            Categories={Categories}
            Price={Price}
          />
        </ButtonToolbar>
        <br></br>
        <div className="container mt-4">
          <Row>
            {displayMovies.map((movie, index) => (
              <Col key={movie.MovieID} md={3} sm={6} xs={12} className="mb-4">
                <Card style={cardStyle}>
                  <Card.Img
                    variant="top"
                    src={moviePosters[movie.Name] || Theforever} 
                    alt={movie.Name}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{movie.Name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}
