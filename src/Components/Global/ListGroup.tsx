import React, { useState } from "react";
import { Link } from "react-router-dom";

const ListGroup = ({ toggled, setToggled, name, links, icon }) => {
  interface ItemInterface {
    name: string;
    link: string;
  }

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
              <p className="main-nav-list-linkHeader d-flex flex-column">{name}</p>
            </div>

            <i className={toggleLinkSlide ? "fa-solid fa-angle-down" : "fa-solid fa-angle-right"}></i>
          </span>
          <div className={toggleLinkSlide ? "main-nav-list-links link-slide" : "main-nav-list-links"}>
            {links.map((item: ItemInterface) => {
              const { name, link } = item;
              return (
                <Link
                  key={link}
                  to={link}
                  onClick={() => setToggled(true)}
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
