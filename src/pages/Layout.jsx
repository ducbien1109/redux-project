import React from "react";
import { Outlet } from "react-router";
import SlideBar from "../component/SlideBar";
import Header from "../component/Header";
import Footer from "../component/Footer";

const Layout = () => {
  return (
    <div>
      <div className="home">
        <div className="home-list">
          <SlideBar />
          <Header />
        </div>
        <Footer />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
