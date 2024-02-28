// CLIENT HANDLE FILE CHECK
export function handleFileTypeCheck(fileName, handleInputErrors) {
  let index = fileName.lastIndexOf(".");
  let extension = fileName.substring(-1 + index + 1);

  let noPng = extension !== ".png";
  let noJPEG = extension !== ".jpeg";
  let noJPG = extension !== ".jpg";

  if (noPng && noJPEG && noJPG) {
    handleInputErrors("fileType", true);
    console.log(`Please give valid extension, extention given: ${extension}`);
    return noPng && noJPEG && noJPG;
  } else {
    handleInputErrors("fileType", false);
    console.log(` valid extension, extention given: ${extension}`);
    return false;
  }
}

export function handleEmailCheck(input, handleInputErrors) {
  let atindex = input.lastIndexOf("@");
  let dotindex = input.lastIndexOf(".");
  let domain = input.substring(atindex + 1, dotindex);
  let beforeAt = input.substring(0, atindex);

  let endInDotCom = !input.endsWith(".com");
  let includesAt = !input.includes("@");
  let emptyString = domain === "";
  let emptyStringBeforeIndex = beforeAt === "";

  if (endInDotCom || includesAt || emptyString || emptyStringBeforeIndex) {
    handleInputErrors("email", true);
    console.log("Please enter valid email");
    return endInDotCom && includesAt && emptyString && emptyStringBeforeIndex;
  } else {
    handleInputErrors("email", false);
    console.log("correct email with domain");
    return false;
  }
}
