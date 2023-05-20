import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { logOut } from "../features/auth/authSlice";
import React from "react";

const Header = () => {
  const user = useSelector(selectCurrentUser);
  console.log(user);
  const isLogin = Boolean(user);

  const dispatch = useDispatch();
  const navigat = useNavigate();
  const logout = () => {
    dispatch(logOut());
    navigat("/");
  };
  return (
    <header className="Header">
      <div className="container headerContainer ">
        <div className="row">
          <div className="col">
            <h1 className="light">Shops Manager</h1>
            <nav className="headerNavi">
              <ul>
                <li>
                  <Link to="/">Startseite</Link>
                </li>

                {isLogin && (
                  <>
                    <li>
                      <Link to="shop">Neuer Laden</Link>
                    </li>
                    <li>
                      <Link to={`user/${user.id}`}>Profile</Link>
                    </li>
                  </>
                )}

                {!isLogin ? (
                  <Link className="btn light" to="login">
                    Login
                  </Link>
                ) : (
                  <button className="btn light" onClick={logout}>
                    Logout
                  </button>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
