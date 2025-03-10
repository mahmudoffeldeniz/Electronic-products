import { Link } from "react-router-dom";
import "../assets/404page.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-text">
        <h1 className="txt-h1">404</h1>
      </div>
      <p className="not-found-text">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className="back-home-btn">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
