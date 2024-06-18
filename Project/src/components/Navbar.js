import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mb-3">
            <button type="button" className="navbar-toggler" data-toggle="offcanvas" data-target="#sidebar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#" title="Free Bootstrap 4 Admin Template">Record Book</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="collapsingNavbar">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="//www.codeply.com">Link</a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#myAlert" data-toggle="collapse">Alert</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="" data-target="#myModal" data-toggle="modal">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fab fa-google-plus-g"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fas fa-envelope-open-text"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fas fa-align-justify"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
