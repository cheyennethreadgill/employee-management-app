// IMAGE COMPONENT
function ImageComponent({ image, navImage }) {
  console.log(navImage);
  const AWS_S3_BUCKET_URL = `https://kuberemployeemanagementimages.s3.us-east-2.amazonaws.com/${image}`;
  if (!image || image === " ") {
    if (navImage === true) {
      return <i className="fa-solid fa-circle-user fs-1"></i>;
    }
    return <i className="fa-solid fa-circle-user fs-2"></i>;
  }

  if (image && typeof image === "string" && image.trim()) {
    return (
      <img
        src={image || AWS_S3_BUCKET_URL}
        alt="desktop img"
        height="35px"
        width="35px"
        className="employee-card-img"
      />
    );
  }
}

export default ImageComponent;
