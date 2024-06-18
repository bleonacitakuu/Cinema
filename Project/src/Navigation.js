import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import logo from './img/logo.png';

export class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="md">
                <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center mr-auto">
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="Logo e Juaj"
                    />
                    <span className="ml-2">CINEMA</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={NavLink} exact to="/" className="nav-link" activeClassName="active">
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/moviecategories" className="nav-link" activeClassName="active">
                            Movie Categories
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/movie" className="nav-link" activeClassName="active">
                            Movies
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/ticket" className="nav-link" activeClassName="active">
                            Ticket
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/events" className="nav-link" activeClassName="active">
                            Events
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/contactform" className="nav-link" activeClassName="active">
                            Contact Form
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/department" className="nav-link" activeClassName="active">
                            Department
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/employee" className="nav-link" activeClassName="active">
                            Employee
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/register" className="nav-link" activeClassName="active">
                            Register
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/dashboard" className="nav-link" activeClassName="active">
                            Dashboard
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
