// function Input Error component
const InputErrorComponent = ({ errorType, errorPContent }) => {
  if (errorType == "fileType") {
    return (
      <div className="text-danger">
        <p> {errorPContent} </p>
      </div>
    );
  }
  if (errorType == "email") {
    return (
      <div className="text-danger">
        <p> {errorPContent} </p>
      </div>
    );
  }
  if (errorType == "password") {
    return (
      <div className="text-danger">
        <p> {errorPContent} </p>
      </div>
    );
  } else {
    console.log("errorType not found");
  }
};
export default InputErrorComponent;
