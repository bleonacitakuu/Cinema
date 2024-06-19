import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cinemaa from "./img/cinemaa.png";
import TheSuicideSquad from "./img/The Suicide Squad.jpg";
import FastAndFurious from "./img/Fast and Furious.jpg";
import BlackWidow from "./img/BlackWidow.jpg";
import HomeAlone from "./img/Home Alone.jpg";
import HachiADog from "./img/Hachi_A_Dog.jpg";
import Theforever from "./img/The Forever Purge.jpg";

const backgroundStyle = {
  backgroundImage: `url(${Cinemaa})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  textAlign: "center",
  position: "relative",
  paddingBottom: "100px", // Ensure space for footer
};

const cardStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  margin: "10px",
};

const containerStyle = {
  flex: '1',
  marginBottom: '100px', // Increase space below the content
};

const footerStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: 'white',
  padding: '10px 0',
  position: 'absolute',
  bottom: '0',
  width: '100%',
  textAlign: 'center'
};

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        { EventID: 1, Movie: "Suicide Squad", Image: TheSuicideSquad },
        { EventID: 2, Movie: "Black Widow", Image: BlackWidow },
        { EventID: 3, Movie: "Fast and Furious", Image: FastAndFurious },
        { EventID: 4, Movie: "Home Alone", Image: HomeAlone },
        { EventID: 5, Movie: "Hachi A Dog ", Image: HachiADog },
        { EventID: 6, Movie: "The Forever", Image: Theforever },
      ],
    };
  }
  render() {
    const { events } = this.state;
    return (
      <div style={backgroundStyle}>
        <h2 style={{ marginBottom: "50px", marginTop: "50px", color: "white" }}>Most watched movies</h2>
        <Container style={containerStyle}>
          <Row>
            {events.map((event) => (
              <Col key={event.EventID} md={2} sm={4} xs={10}>
                <Card style={cardStyle}>
                  <Card.Img
                    variant="top"
                    src={event.Image}
                    alt="Card image"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{event.Movie}</Card.Title>
                    <Link to={`/ticket/${event.EventID}`}>
                      <Button variant="primary">Watch now</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <div style={footerStyle}>
          <Container>
            <Row>
              <Col>
                <p>© 2024 Cinema Inc. All rights reserved.</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
