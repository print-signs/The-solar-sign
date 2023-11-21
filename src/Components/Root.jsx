import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import React from "react";
import Footer from "../Components/Footer";

const Root = () => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Root;
