import { useNavigate, redirect } from "react-router-dom";
import { useState } from "react";

import { useUser } from "../../Hooks/useUser";
import { toSentenceCase } from "../../Helpers/strings";
import ImageComponent from "../Employees/EmployeeImageComponent";
import { Image } from "react-bootstrap";
const logo = require("../../images/logo.png");

const TopNav = ({ handleNavToggle, handleMouseLeave, toggled }) => {
  const [user] = useUser();

  const { username, fname } = user;
  const navigate = useNavigate();
  const [optionPanelDisplay, setOptionPanelDisplay] = useState(false);
  const handleOptionPanelDisplay = () => setOptionPanelDisplay(!optionPanelDisplay);

  return (
    <>
      {/* ******************************MOBILE */}
      <div className="brand-bar-mobile d-md-block d-lg-none">
        <div className="brand-bar-mobile-controls-container">
          <div className="brand-bar-mobile-controls">
            <>
              {toggled ? (
                <button
                  className="btn-none opacity-0"
                  onClick={handleNavToggle}
                >
                  <i className="brand-bar-mobile-toggle fa-solid fa-bars"></i>
                </button>
              ) : null}

              <div className="brand-bar-mobile-brand">
                <img
                  src={logo}
                  alt=""
                  className="brand-bar-mobile-brand-icon"
                  width="100%"
                  height="100%"
                />
                <h1 className="brand-bar-mobile-brand-logo">Kuber</h1>
              </div>
            </>

            <div className="brand-bar-mobile-brand-right">
              <p>{fname}</p>
              <ImageComponent
                image={null}
                navImage={false}
              />
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/auth/login");
                }}
                className="btn-none"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ******************************DESKTOP */}

      <div className="brand-bar-desktop d-none d-lg-block">
        <div className="brand-bar-desktop-controls-container">
          <div className="brand-bar-desktop-controls">
            {toggled ? (
              <img
                src={logo}
                alt=""
                className="me-5"
              />
            ) : (
              <div className="brand-bar-desktop-brand-left">
                <img
                  src={logo}
                  alt=""
                  className="me-3"
                />
                <h1 className="">Kuber</h1>
              </div>
            )}
            <button
              className="btn-none"
              onClick={handleNavToggle}
            >
              <span className="opacity-0">main menu</span>
              <i className="brand-bar-mobile-toggle fa-solid fa-bars"></i>
            </button>
            <div className="brand-bar-desktop-brand-right">
              <i className="fa-regular fa-bell"></i>
              {/* <i className="fa-solid fa-bell"></i> */}
              <div className="options">
                <button
                  className="d-flex gap-3 btn btn-none align-items-center"
                  onClick={handleOptionPanelDisplay}
                >
                  <p className="brand-bar-desktop-brand-right-name fw-medium text-dark">{toSentenceCase(fname)}</p>
                  <div className="brand-bar-desktop-brand-right-img">
                    <ImageComponent
                      image={null}
                      navImage={false}
                    />

                    {optionPanelDisplay ? (
                      <div className="options-btns">
                        <a
                          className="btn-none options-btns-link"
                          href="/auth/login"
                          onClick={() => {
                            localStorage.removeItem("token");
                          }}
                        >
                          Logout
                        </a>
                      </div>
                    ) : null}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
