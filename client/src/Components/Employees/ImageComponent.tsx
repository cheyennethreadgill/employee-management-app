// IMAGE COMPONENT
function ImageComponent({ image, navImage }) {
  const AWS_S3_BUCKET_URL = `https://kuberemployeemanagementimages.s3.us-east-2.amazonaws.com/${image}`;

  if (!image || image === " ") {
    if (navImage === true) {
      return <i className="fa-solid fa-circle-user fs-1"></i>;
    }
    return <i className="fa-solid fa-circle-user fs-2"></i>;
  }

  if (navImage === "main-nav") {
    if (image && typeof image === "string" && image.trim()) {
      return (
        <img
          src={AWS_S3_BUCKET_URL}
          alt="employee image"
          height="100px"
          width="100px"
          className="employee-card-img"
        />
      );
    }
  }
  if (navImage) {
    if (image && typeof image === "string" && image.trim()) {
      return (
        <img
          src={AWS_S3_BUCKET_URL}
          alt="employee image"
          height="28px"
          width="28px"
          className="employee-card-img"
        />
      );
    }
  } else {
    if (image && typeof image === "string" && image.trim()) {
      return (
        <img
          src={AWS_S3_BUCKET_URL}
          alt="employee image"
          height="32px"
          width="32px"
          className="employee-card-img"
        />
      );
    }
  }
}

export default ImageComponent;
