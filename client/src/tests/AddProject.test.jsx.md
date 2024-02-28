// import React from "react";
// import { useState } from "react";
// import { render, getByText, screen, fireEvent } from "@testing-library/react";
// import AddProject from "../src/Components/Projects/AddProject";

// test('Check for form submission state to change when button is clicked"', () => {
//   const URL = "example.com";
//   const departmentOptions = [];
//   const teamOptions = [];
//   const priorityOptions = [];
//   const workStatusOptions = [];

//   const ServerErrorComponent = jest.fn();
//   const handleFetchPromiseError = jest.fn();
//   const handleJsonPromiseResponseLog = jest.fn();
//   const handleFetchError = jest.fn();

//   let formSubmitted = false;

//   try {
//     const { getByText } = render(
//       <AddProject
//         URL={URL}
//         ServerErrorComponent={ServerErrorComponent}
//         handleFetchPromiseError={handleFetchPromiseError}
//         handleJsonPromiseResponseLog={handleJsonPromiseResponseLog}
//         handleFetchError={handleFetchError}
//         workStatusOptions={workStatusOptions}
//         priorityOptions={priorityOptions}
//         teamOptions={teamOptions}
//         departmentOptions={departmentOptions}
//       />
//     );

//     const button = screen.getByText(/Submit/i);
//     fireEvent.click(button);
//     expect(formSubmitted).toBeTruthy();
//   } catch (err) {
//     console.log(`Error with render in text: ${err}`);
//     throw err;
//   }
// });
