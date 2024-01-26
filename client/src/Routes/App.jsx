import React, { useState } from "react";
import Nav from "../Components/Global/Nav";
import { Outlet } from "react-router-dom";
import TopNav from "../Components/Global/TopNav";

function Dashboard() {
  const [toggled, setToggled] = useState(false);
  const handleNavToggle = () => setToggled(!toggled);
  const handleMouseLeave = () => setToggled(!toggled);

  return (
    <section className="app">
      <TopNav
        handleNavToggle={handleNavToggle}
        handleMouseLeave={handleMouseLeave}
        toggled={toggled}
      />

      <div className="app-flex">
        <Nav
          toggled={toggled}
          handleNavToggle={handleNavToggle}
          handleMouseLeave={handleMouseLeave}
        />

        <Outlet />
      </div>
    </section>
  );
}

export default Dashboard;
