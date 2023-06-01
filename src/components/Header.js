import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { logOut } from "../features/auth/authSlice";
import React from "react";
import { Col, Row, Container } from "react-bootstrap";

const Header = () => {
  const user = useSelector(selectCurrentUser);
  // console.log(user);
  const isLogin = Boolean(user);

  const dispatch = useDispatch();
  const navigat = useNavigate();
  const logout = () => {
    dispatch(logOut());
    navigat("/");
  };
  return (
    <header className="Header">
      <Container className="con headerContainer">
        <Row>
          <Col
            lg="4"
            className="d-flex logoCol justify-content-center justify-content-lg-start align-items-lg-center "
          >
            <h1 className="light">Shops Manager</h1>
          </Col>
          <Col
            lg="8"
            className="headerCol justify-content-center justify-content-lg-end"
          >
            <nav className="headerNavi">
              <ul d-flex>
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
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
