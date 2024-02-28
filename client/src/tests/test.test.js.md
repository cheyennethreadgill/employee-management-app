import { fireEvent, getByText, render } from "@testing-library/react";
import PersonBio from "./test";

test("TEST: increments age when button is clicked", () => {
const { getByText } = render(<PersonBio />);

const button = getByText(/Change age/);
fireEvent.click(button);

const p = getByText(/Age: 52/);
expect(p).toHaveTextContent("Age: 52");
});
