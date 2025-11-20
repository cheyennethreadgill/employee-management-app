import React, { useState } from "react";
import Nav from "./Components/Global/Nav";
import { Outlet } from "react-router-dom";
import TopNav from "./Components/Global/TopNav";

function App() {
  const [toggled, setToggled] = useState(true);
  const handleNavToggle = () => setToggled(!toggled);
  const handleMouseLeave = () => setToggled(true);

  return (
    <section className="app">
      <TopNav
        handleNavToggle={handleNavToggle}
        handleMouseLeave={handleMouseLeave}
        toggled={toggled}
      />

      <Nav
        toggled={toggled}
        setToggled={setToggled}
        handleNavToggle={handleNavToggle}
        handleMouseLeave={handleMouseLeave}
      />
      <div className="app-flex">
        <div className="container-custom">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default App;
