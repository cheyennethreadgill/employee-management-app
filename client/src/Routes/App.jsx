import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Global/Nav";
import { Outlet } from "react-router-dom";
import PageHeaders from "../Components/Global/PageHeaders";

import TopNav from "../Components/Global/TopNav";

function Dashboard() {
  const [toggled, setToggled] = useState(false);
  const handleNavToggle = () => setToggled(!toggled);
  const handleMouseLeave = () => setToggled(true);

  return (
    <section className="app">
      <TopNav
        handleNavToggle={handleNavToggle}
        handleMouseLeave={handleMouseLeave}
        toggled={toggled}
      />

      <div className="app-flex">
        <Nav toggled={toggled} />

        <Outlet />
      </div>
    </section>
  );
}

export default Dashboard;
