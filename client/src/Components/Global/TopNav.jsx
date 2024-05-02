import { useUser } from "../../Hooks/useUser";
import { toSentenceCase } from "../../Helpers/strings";
import ImageComponent from "../Employees/EmployeeImageComponent";
import { Image } from "react-bootstrap";
const logo = require("../../images/logo.png");
const profileImg = require("../../images/admin.jpg");

const TopNav = ({ handleNavToggle, handleMouseLeave, toggled }) => {
  const [user] = useUser();

  const { username, fname } = user;

  return (
    <>
      {/* ******************************MOBILE */}
      <div className="brand-bar-mobile d-md-block d-lg-none">
        <div className="brand-bar-mobile-controls-container">
          <div className="brand-bar-mobile-controls">
            <>
              {toggled ? (
                <i
                  type="button"
                  className="brand-bar-mobile-toggle fa-solid fa-bars"
                  onClick={handleNavToggle}
                ></i>
              ) : null}

              <div className="brand-bar-mobile-brand">
                <img
                  src={logo}
                  alt=""
                  className="brand-bar-mobile-brand-icon"
                />
                <h1 className="brand-bar-mobile-brand-logo">Kuber</h1>
              </div>
            </>

            <div className="brand-bar-mobile-brand-right">
              <p>{fname}</p>
              <ImageComponent
                image="../../images/logo.png"
                navImage={false}
              />
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
            <i
              type="button"
              className="brand-bar-mobile-toggle fa-solid fa-bars"
              onClick={handleNavToggle}
            ></i>
            <div className="brand-bar-desktop-brand-right">
              <i className="fa-regular fa-bell"></i>
              {/* <i className="fa-solid fa-bell"></i> */}
              <button className="d-flex gap-3 btn-none align-items-center">
                {" "}
                <p className="brand-bar-desktop-brand-right-name fw-medium text-dark">{toSentenceCase(fname)}</p>
                <div className="brand-bar-desktop-brand-right-img">
                  <ImageComponent
                    image={profileImg}
                    navImage={false}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
