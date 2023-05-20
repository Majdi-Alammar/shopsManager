import React from "react";
import { Link } from "react-router-dom";

function NotFound404(props) {
  return (
    <div>
      <h1>
        Diese Seite existiert nicht!
        <span className="block">Fehler 404</span>
      </h1>
      {/* <a className='btn' href="/home" ></a> */}
      <Link to="/" className="btn">
        zur Startseite
      </Link>
    </div>
  );
}

export default NotFound404;
