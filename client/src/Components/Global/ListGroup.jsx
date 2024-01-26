import React, { useState } from "react";
import { Link } from "react-router-dom";

const ListGroup = ({ toggled, name, links, icon }) => {
  const [toggleLinkSlide, setToggleLinkSlide] = useState(false);
  const handleLinkSlide = () => setToggleLinkSlide(!toggleLinkSlide);

  return (
    <>
      {toggled ? (
        <span className={icon}></span>
      ) : (
        <>
          <span
            onClick={handleLinkSlide}
            className="main-nav-list-icon-container"
          >
            <div>
              <span className={icon}></span>
              <p className="main-nav-list-linkHeader d-flex flex-column">
                {name}
              </p>
            </div>

            <i
              className={
                toggleLinkSlide
                  ? "fa-solid fa-angle-right"
                  : "fa-solid fa-angle-down"
              }
            ></i>
          </span>
          <div
            className={
              toggleLinkSlide
                ? "main-nav-list-links link-slide"
                : "main-nav-list-links"
            }
          >
            {links.map((item) => {
              const { name, link } = item;
              return (
                <Link
                  key={link}
                  to={link}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default ListGroup;
