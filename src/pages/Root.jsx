import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import { Toaster } from "react-hot-toast";


function RootLayout() {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Toaster />
    </>
  );
}

export default RootLayout;
