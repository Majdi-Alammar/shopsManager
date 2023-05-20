import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom";

import React from "react";

const Cms = () => {
  const user = useSelector(selectCurrentUser);

  const welcome = user ? `Welcome ${user}!` : "Welcome";

  const content = (
    <section>
      <h1>{welcome}</h1>
      <p>
        <Link to="/user">Got to the users List</Link>
      </p>
    </section>
  );
  return content;
};

export default Cms;
