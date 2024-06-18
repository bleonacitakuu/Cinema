import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import Sidebar from './Sidebar';


const Dashboard = () => {
  const [record, setRecord] = useState([]);


  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((res) => setRecord(res));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="col main pt-5 mt-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Library</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>
      <p className="lead d-none d-sm-block">Add Employee Details and Records</p>
      <div className="alert alert-warning fade collapse" role="alert" id="myAlert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
        <strong>Data and Records</strong> Learn more about employee
      </div>
      <div className="row mb-3">
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card bg-success text-white h-100">
            <div
              className="card-body bg-success"
              style={{ backgroundColor: "#57b960" }}
            >
              <div className="rotate">
                <i className="fa fa-user fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Users</h6>
              <h1 className="display-4">134</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-danger h-100">
            <div className="card-body bg-danger">
              <div className="rotate">
                <i className="fa fa-list fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Posts</h6>
              <h1 className="display-4">87</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-info h-100">
            <div className="card-body bg-info">
              <div className="rotate">
                <i className="fab fa-twitter fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Tweets</h6>
              <h1 className="display-4">125</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <div className="rotate">
                <i className="fa fa-share fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Shares</h6>
              <h1 className="display-4">36</h1>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {<div className="row placeholders mb-3">
            <div className="col-6 col-sm-3 placeholder text-center">
                <img src="//placehold.it/200/dddddd/fff?text=1" className="mx-auto img-fluid rounded-circle" alt="Generic placeholder thumbnail"/>
                <h4>Responsive</h4>
                <span className="text-muted">Device agnostic</span>
            </div>
            <div className="col-6 col-sm-3 placeholder text-center">
                <img src="//placehold.it/200/e4e4e4/fff?text=2" className="mx-auto img-fluid rounded-circle" alt="Generic placeholder thumbnail"/>
                <h4>Frontend</h4>
                <span className="text-muted">UI / UX oriented</span>
            </div>
            <div className="col-6 col-sm-3 placeholder text-center">
                <img src="//placehold.it/200/d6d6d6/fff?text=3" className="mx-auto img-fluid rounded-circle" alt="Generic placeholder thumbnail"/>
                <h4>HTML5</h4>
                <span className="text-muted">Standards-based</span>
            </div>
            <div className="col-6 col-sm-3 placeholder text-center">
                <img src="//placehold.it/200/e0e0e0/fff?text=4" className="center-block img-fluid rounded-circle" alt="Generic placeholder thumbnail"/>
                <h4>Framework</h4>
                <span className="text-muted">CSS and JavaScript</span>
            </div>
        </div> }

      <div className="row">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">
            Check More Records of Employees
          </h5>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <th>No</th>
                  <th>Label</th>
                  <th>Header</th>
                  <th>Column</th>
                  <th>Record Data</th>
                </tr>
              </thead>
              <tbody>
                {record.slice(0, 5).map((output) => (
                  <tr key={output.id}>
                    <td>{output.id}</td>
                    <td>{output.name}</td>
                    <td>{output.email}</td>
                    <td>{output.username}</td>
                    <td>{output.website}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12 col-sm-offset-5">
          <h4 className="title mt-3 mb-3 text-center text-secondary">
            Data in Chart
          </h4>
          <div className="mb-5" style={{ height: "300px", width: "400px" }}>
            <PieChart />{" "}
          </div>
        </div>
      </div>

      <a id="more"></a>
      <hr />
      <h2 className="sub-header mt-5">
        Use card decks for equal height rows of cards
      </h2>
      <div className="mb-3">
        <div className="card-deck">
          <div className="card card-inverse card-success text-center">
            <div className="card-body">
              <blockquote className="card-blockquote">
                <p>
                  It's really good news that the new Bootstrap 4 now has support
                  for CSS 3 flexbox.
                </p>
                <footer>
                  Makes flexible layouts{" "}
                  <cite title="Source Title">Faster</cite>
                </footer>
              </blockquote>
            </div>
          </div>
          <div className="card card-inverse card-danger text-center">
            <div className="card-body">
              <blockquote className="card-blockquote">
                <p>
                  The Bootstrap 3.x element that was called "Panel" before, is
                  now called a "Card".
                </p>
                <footer>
                  All of this makes more <cite title="Source Title">Sense</cite>
                </footer>
              </blockquote>
            </div>
          </div>
          <div className="card card-inverse card-warning text-center">
            <div className="card-body">
              <blockquote className="card-blockquote">
                <p>
                  There are also some interesting new text classes for uppercase
                  and capitalize.
                </p>
                <footer>
                  These handy utilities make it{" "}
                  <cite title="Source Title">Easy</cite>
                </footer>
              </blockquote>
            </div>
          </div>
          <div className="card card-inverse card-info text-center">
            <div className="card-body">
              <blockquote className="card-blockquote">
                <p>
                  If you want to use cool icons in Bootstrap 4, you'll have to
                  find your own such as Font Awesome or Ionicons.
                </p>
                <footer>
                  The Glyphicons are not{" "}
                  <cite title="Source Title">Included</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <a id="flexbox"></a>
      <hr />
      <h2 className="mt-5">Masonry-style grid columns</h2>
      <h6>
        with Bootstrap 4 flexbox{" "}
        <a
          href="https://v4-alpha.getbootstrap.com/layout/grid/#grid-options"
          target="_blank"
        >
          Grid Documentation
        </a>
      </h6>

      <div className="card-columns mb-3">
        <div className="card">
          <img
            className="card-img-top img-fluid"
            src="https://placehold.it/600x200/465bd9/fff?text=1"
            alt="Card image cap"
          />
          <div className="card-body">
            <h4 className="card-title">New XL Grid Tier</h4>
            <p className="card-text">
              In addition to the five default responsive tiers, Bootstrap 4
              includes a new XL (extra large) tier.
            </p>
          </div>
        </div>
        <div className="card card-body">
          <blockquote className="card-blockquote">
            <p>
              Bootstrap 4 will be lighter and easier to customize thanks to
              support for CSS variables and Sass.
            </p>
            <footer>
              <small className="text-muted">
                Someone famous in{" "}
                <cite title="Source Title">Bootstrap</cite>
              </small>
            </footer>
          </blockquote>
        </div>
        <div className="card">
          <img
            className="card-img-top img-fluid"
            src="https://placehold.it/600x200/563d7c/fff?text=2"
            alt="Card image cap"
          />
          <div className="card-body">
            <h4 className="card-title">Bootstrap 4</h4>
            <p className="card-text">
              Bootstrap 4 will be lighter and easier to customize thanks to
              support for CSS variables and Sass.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
        <div className="card card-body card-inverse card-primary text-center">
          <blockquote className="card-blockquote">
            <p>
              Bootstrap 4 will be lighter and easier to customize thanks to
              support for CSS variables and Sass.
            </p>
            <footer>
              <small>
                Someone famous in{" "}
                <cite title="Source Title">Bootstrap</cite>
              </small>
            </footer>
          </blockquote>
        </div>
        <div className="card card-body text-center">
          <h4 className="card-title">Responsive</h4>
          <p className="card-text">
            Bootstrap 4 will be lighter and easier to customize thanks to
            support for CSS variables and Sass.
          </p>
          <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
        <div className="card">
          <img
            className="card-img img-fluid"
            src="https://placehold.it/600x200/e6594d/fff?text=3"
            alt="Card image"
          />
        </div>
        <div className="card card-body text-right">
          <blockquote className="card-blockquote">
            <p>
              Bootstrap 4 will be lighter and easier to customize thanks to
              support for CSS variables and Sass.
            </p>
            <footer>
              <small className="text-muted">
                Someone famous in{" "}
                <cite title="Source Title">Source Title</cite>
              </small>
            </footer>
          </blockquote>
        </div>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Bootstrap 4</h4>
            <p className="card-text">
              Bootstrap 4 will be lighter and easier to customize thanks to
              support for CSS variables and Sass.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
        <div className="card">
          <img
            className="card-img img-fluid"
            src="https://placehold.it/600x200/9c27b0/fff?text=4"
            alt="Card image"
          />
        </div>
        <div className="card card-body text-center">
          <blockquote className="card-blockquote">
            <p>
              Bootstrap 4 will be lighter and easier to customize thanks to
              support for CSS variables and Sass.
            </p>
            <footer>
              <small className="text-muted">
                Someone famous in{" "}
                <cite title="Source Title">Bootstrap</cite>
              </small>
            </footer>
          </blockquote>
        </div>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Flexbox</h4>
            <p className="card-text">
              Bootstrap 4 will be lighter and easier to customize thanks to
              support for CSS variables and Sass.
            </p>
          </div>
        </div>
        <div className="card">
          <img
            className="card-img img-fluid"
            src="https://placehold.it/600x200/5a4887/fff?text=5"
            alt="Card image"
          />
        </div>
        <div className="card card-body">
          <blockquote className="card-blockquote">
            <p>
              Bootstrap 4 will be lighter and easier to customize thanks to
              support for CSS variables and Sass.
            </p>
            <footer>
              <small className="text-muted">
                Someone famous in{" "}
                <cite title="Source Title">Source Title</cite>
              </small>
            </footer>
          </blockquote>
        </div>
      </div>
      <a id="layouts"></a>
      <hr />
      <h2 className="mt-5">Responsive Layout</h2>
      <h6>
        with Bootstrap 4 flexbox{" "}
        <a
          href="https://v4-alpha.getbootstrap.com/layout/grid/#grid-options"
          target="_blank"
        >
          Grid Documentation
        </a>
      </h6>

      <div className="row mb-3">
        <div className="col-lg-6">
          <div className="card mb-3">
            <div className="card-body">
              <h4 className="card-title">New XL Grid Tier</h4>
              <p>
                In addition to the five default responsive tiers, Bootstrap 4
                includes a new XL (extra large) tier.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card mb-3">
            <div className="card-body">
              <h4 className="card-title">CSS Grid</h4>
              <p>
                Bootstrap 4 will be lighter and easier to customize thanks to
                support for CSS variables and Sass.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
