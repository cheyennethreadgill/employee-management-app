import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Global/Nav";
import { Outlet } from "react-router-dom";
import PageHeaders from "../Components/Global/PageHeaders";

function Dashboard() {
  return (
    <section className="app">
      <Nav />

      <Outlet />
    </section>
  );
}

export default Dashboard;
