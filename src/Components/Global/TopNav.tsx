import { useNavigate, redirect } from "react-router-dom";
import { useState } from "react";

import { useUser } from "../../Hooks/useUser";
import { toSentenceCase } from "../../Helpers/strings";
import ImageComponent from "../Employees/ImageComponent";
const logo = "../../images/logo.png";

const TopNav = ({ handleNavToggle, handleMouseLeave, toggled }) => {
  const [user] = useUser();

  const { fname, image } = user;

  const navigate = useNavigate();
  const [optionPanelDisplay, setOptionPanelDisplay] = useState(false);
  const handleOptionPanelDisplay = () => setOptionPanelDisplay(!optionPanelDisplay);

  // const handleLogout = async () => {
  //   // // Post options
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       Accept: "*",
  //     },
  //     body: "",
  //   };

  //   // try {
  //   //   const fetchPromiseResponse = await fetch(`${URL}auth/logout`, options);
  //   //   handleFetchPromiseError(fetchPromiseResponse);
  //   //   if (!fetchPromiseResponse.ok) {
  //   //     console.log(await fetchPromiseResponse.text());
  //   //   } else {
  //   //     const jsonPromiseResponse = await fetchPromiseResponse.json();
  //   //     // if theres an error, set state, udate ui to log response
  //   //     handleJsonPromiseResponseLog(jsonPromiseResponse, setFormError, InputErrorComponent);
  //   //     console.log(jsonPromiseResponse);
  //   //   }
  //   // } catch (err) {
  //   //   console.log(`Error in Add employee fetch:`);
  //   //   handleFetchError(err);
  //   // }
  // };

  return (
    <>
      {/* ******************************MOBILE */}
      <div className="brand-bar-mobile d-md-block d-lg-none">
        <div className="brand-bar-mobile-controls-container">
          <div className="brand-bar-mobile-controls">
            {toggled ? (
              <button
                className="btn-none"
                onClick={handleNavToggle}
              >
                <span className="opacity-0">main menu</span>
                <i className="brand-bar-mobile-toggle fa-solid fa-bars"></i>
              </button>
            ) : null}
            <>
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
              <div className="options">
                <button
                  className="d-flex gap-3 btn btn-none align-items-center"
                  onClick={handleOptionPanelDisplay}
                >
                  <p className="m-0 fw-medium ">{fname}</p>
                  <ImageComponent
                    image={image}
                    navImage={true}
                  />
                  {optionPanelDisplay ? (
                    <div className="options-btns">
                      <button
                        className="btn-none options-btns-link"
                        onClick={() => {
                          // handleLogout();
                          localStorage.removeItem("token");
                          navigate("/auth/login");
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  ) : null}
                </button>
              </div>
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
                      image={image}
                      navImage={true}
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
