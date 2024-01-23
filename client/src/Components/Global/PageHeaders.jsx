const PageHeaders = ({ name }) => {
  return (
    <section className="page-headers">
      <h1> {name} </h1>
      <div className="page-headers-breadcrumbs">
        <i className="fa-solid fa-house"></i>
        <i className="fa-solid fa-greater-than "></i>
        <p className="page-headers-breadcrumbs-crumb">Dashboard</p>
        <i className="fa-solid fa-greater-than "></i>
        <p className="page-headers-breadcrumbs-crumb"> {name} </p>
      </div>
    </section>
  );
};

export default PageHeaders;
