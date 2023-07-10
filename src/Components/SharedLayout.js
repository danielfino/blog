import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

function SharedLayout(props) {
  return (
    <div className="App">
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
    </div>
  );
}

export default SharedLayout;
