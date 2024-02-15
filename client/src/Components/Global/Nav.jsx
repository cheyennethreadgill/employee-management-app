import React, { useState } from "react";
import pages from "../../Components/pagelinks/pagelinks";
import ListGroup from "./ListGroup";

const Navigation = ({ handleNavToggle, handleMouseLeave, toggled, setToggled }) => {
  return (
    <>
      <nav
        className={toggled ? "main-nav-list_toggled main-nav-list_toggled_mobile" : "main-nav-list"}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleNavToggle}
      >
        {pages.map((page) => {
          const { id, name, links, icon } = page;

          return (
            <ListGroup
              key={id}
              name={name}
              links={links}
              handleNavToggle={handleNavToggle}
              handleMouseLeave={handleMouseLeave}
              toggled={toggled}
              setToggled={setToggled}
              icon={icon}
            />
          );
        })}
      </nav>
    </>
  );
};

export default Navigation;
