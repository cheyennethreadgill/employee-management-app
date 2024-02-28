import { expect, jest } from "@jest/globals";
import { handleFileTypeCheck, handleEmailCheck } from "../Helpers/formValidation";

const handleInputErrors = jest.fn();

describe("handle file type check test", () => {
  it("return TRUE ERROR if file extension ends in ANYTHING BUT .png", () => {
    expect(handleFileTypeCheck("file.env", handleInputErrors)).toBe(true);
    expect(handleInputErrors).toHaveBeenCalledWith("fileType", true);
  });
  it("return NO ERROR if file extension ENDS IN .png", () => {
    expect(handleFileTypeCheck("file.png", handleInputErrors)).toBe(false);
    expect(handleInputErrors).toHaveBeenCalledWith("fileType", false);
  });
  it("return NO ERROR if file extension ENDS IN .jpg", () => {
    expect(handleFileTypeCheck("file.jpg", handleInputErrors)).toBe(false);
    expect(handleInputErrors).toHaveBeenCalledWith("fileType", false);
  });
  it("return NO ERROR if file extension ENDS IN .jpeg", () => {
    expect(handleFileTypeCheck("file.jpeg", handleInputErrors)).toBe(false);
    expect(handleInputErrors).toHaveBeenCalledWith("fileType", false);
  });
});

describe("handle email check", () => {
  it("return TRUE ERROR if email DOESNT END IN .com", () => {
    expect(handleEmailCheck("testemail", handleInputErrors)).toBe(true);
    expect(handleInputErrors).toHaveBeenCalledWith("email", true);
  });
  it("return TRUE ERROR if email DOESNT INCLUDE @", () => {
    expect(handleEmailCheck("testemail", handleInputErrors)).toBe(true);
    expect(handleInputErrors).toHaveBeenCalledWith("email", true);
  });
  it("return TRUE ERROR if email IS AN EMPTY STRING", () => {
    console.log(handleEmailCheck("", handleInputErrors));
    expect(handleEmailCheck("", handleInputErrors)).toBe(true);
    expect(handleInputErrors).toHaveBeenCalledWith("email", true);
  });
});
