import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetUserByUserNameAndPasswordQuery,
  useGetUsersQuery,
  selectAllUsers,
} from "../users/usersSlice";
import { selectCurrentUser } from "./authSlice";
import { setCredentials } from "./authSlice";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  //const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const currUser = useSelector(selectCurrentUser);

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("getUsers");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(users);
    let findUser = users.ids.find(
      (userId) =>
        users.entities[userId].username === username &&
        users.entities[userId].password === pwd
    );
    findUser = users.entities[findUser];
    if (findUser) {
      dispatch(setCredentials({ ...findUser }));
      navigate(`/user/${findUser.id}`);
    } else {
      dispatch(setCredentials(null));
    }
  };
  const handleUserInput = (e) => setUser(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="row login">
      <div className="col-lg-6 ">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Mitglieder Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />
          </Form.Group>
          <Form.Group controlId="pasword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              ref={userRef}
              value={pwd}
              onChange={handlePwdInput}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Anmelden
          </Button>
        </Form>
      </div>
    </div>
  );

  return content;
};

export default Login;
