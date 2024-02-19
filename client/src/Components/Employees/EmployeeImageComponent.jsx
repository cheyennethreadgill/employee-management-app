// IMAGE COMPONENT
function ImageComponent({ image }) {
  const AWS_S3_BUCKET_URL = `https://kuberemployeemanagementimages.s3.us-east-2.amazonaws.com/${image}`;
  if (!image || image === " ") {
    return <i className="fa-solid fa-circle-user fs-2"></i>;
  }

  if (image && typeof image === "string" && image.trim()) {
    return (
      <img
        src={AWS_S3_BUCKET_URL}
        alt="desktop img"
        height="35px"
        width="35px"
        className="employee-card-img"
      />
    );
  }
}

export default ImageComponent;
