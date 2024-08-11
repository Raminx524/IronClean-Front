import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

function PageLayout() {
  return (
    <div className="w-4/5 mx-auto min-h-screen">
      <Navbar />
      <div className="content py-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default PageLayout;
