import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import React from "react";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="App">
        <div className="container mainContainer">
          <div className="row">
            <div className="col">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
