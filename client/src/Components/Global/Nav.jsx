import React, { useState } from "react";
import pages from "../../Components/pagelinks/pagelinks";
import ListGroup from "./ListGroup";
import ImageComponent from "../Employees/EmployeeImageComponent";
import { useUser } from "../../Hooks/useUser";
import { toSentenceCase } from "../../Helpers/strings";

const Navigation = ({ handleNavToggle, handleMouseLeave, toggled, setToggled }) => {
  const [user] = useUser();
  const { username, fname } = user;

  return (
    <>
      <nav
        className={toggled ? "main-nav-list_toggled main-nav-list_toggled_mobile" : "main-nav-list"}
        onMouseLeave={handleMouseLeave}
      >
        <div className="m-0 m-auto my-0 pb-5">
          <ImageComponent
            image=""
            navImage={true}
          />
          <br />
          <span>Welcome, {fname}!</span>

          {/* <span>{toSentenceCase(username)}</span> */}
        </div>

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
