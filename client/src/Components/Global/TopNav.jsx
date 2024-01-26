const TopNav = ({ handleNavToggle, handleMouseLeave, toggled }) => {
  return (
    <>
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
                  src={require("../../images/logo.png")}
                  alt=""
                  className="brand-bar-mobile-brand-icon"
                />
                <h1 className="brand-bar-mobile-brand-logo">Kuber</h1>
              </div>
            </>

            <div className="brand-bar-mobile-brand-right">
              <p>Ella Jones</p>
            </div>
          </div>
        </div>
      </div>

      <div className="brand-bar-desktop d-none d-lg-block">
        <div className="brand-bar-desktop-controls-container">
          <div className="brand-bar-desktop-controls">
            {toggled ? (
              <img
                src={require("../../images/logo.png")}
                alt=""
                className="me-5"
              />
            ) : (
              <div className="brand-bar-desktop-brand-left">
                <img
                  src={require("../../images/logo.png")}
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
              <p>Ella Jones</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
