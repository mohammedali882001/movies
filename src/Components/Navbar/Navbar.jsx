import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand">Movies App</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Movies
            </Link>

            <Link className="nav-link" to="Register">
              Register
            </Link>

            <Link className="nav-link" to="login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

// Install react-router-dom
// App.js => Routes => <Route path .. element />
// <Link to="" />
