import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
export default function Navbar({ userData, setUserData }) {
  let navigate = useNavigate();
  let Logout = () => {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/Login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary fixed-top ${styles.bgbodytertiary}`}
    >
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
            <Link className="nav-link" to="movies">
              Movies
            </Link>
            <Link className="nav-link" to="series">
              TVSeries
            </Link>
            <Link className="nav-link" to="actors">
              Actors
            </Link>
            {/* <Link className="nav-link" to="AddActor">
              Add Actor
            </Link> */}
            <Link className="nav-link" to="director">
              Directors
            </Link>

            <Link className="nav-link" to="getAllFavSeries">
              Favorite Series
            </Link>

            <Link className="nav-link" to="getAllFavMovies">
              Favorite Movies
            </Link>
            {userData === null ? (
              <>
                <Link className="nav-link" to="Register">
                  Register
                </Link>

                <Link className="nav-link" to="login">
                  Login
                </Link>
              </>
            ) : (
              <>
                <span className="nav-link cursor-pointer " onClick={Logout}>
                  Logout
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
