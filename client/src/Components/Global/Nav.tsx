import pages from "../pagelinks/pagelinks";
import ListGroup from "./ListGroup";
import ImageComponent from "../Employees/EmployeeImageComponent";
import { useUser } from "../../Hooks/useUser";

const Navigation = ({ handleNavToggle, handleMouseLeave, toggled, setToggled }) => {
  const [user] = useUser();
  const { fname } = user;

  return (
    <>
      <nav
        className={toggled ? "main-nav-list_toggled main-nav-list_toggled_mobile" : "main-nav-list"}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={
            toggled
              ? " left-nav-account-info_none m-0 m-auto my-0 pb-5"
              : " left-nav-account-info_display m-0 m-auto my-0 pb-5"
          }
        >
          <ImageComponent
            image=""
            navImage={true}
          />
          <br />
          <span>Welcome, {fname}!</span>
        </div>

        {pages.map((page) => {
          const { id, name, links, icon } = page;

          return (
            <ListGroup
              key={id}
              name={name}
              links={links}
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
