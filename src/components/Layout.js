import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="App">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
