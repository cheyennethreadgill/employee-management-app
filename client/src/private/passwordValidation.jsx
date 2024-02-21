export const handlePasswordValidation = (e) => {
  if (e.length > 40) {
    console.log("password too long");
  } else console.log(` Input ${e}`);
};
