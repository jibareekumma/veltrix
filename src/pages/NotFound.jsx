import { Link } from "react-router-dom";
import "../styles/pages/NotFound.scss";

const NotFound = function () {
  return (
    <main className="not-found">
      <span className="not-found__code">404</span>
      <h1 className="not-found__title">Wrong Turn</h1>
      <p className="not-found__text">The page you are looking for does not exist.</p>
      <Link to="/home" className="btn btn--dark">
        Back to Home
      </Link>
    </main>
  );
};

export default NotFound;
