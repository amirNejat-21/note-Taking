import { render, screen, fireEvent } from "@testing-library/react";
import NameInput from "../NameInput";

test("saves and retrieves name from local storage", () => {
  // Save a name to local storage
  const name = "John Doe";
  localStorage.setItem("name", name);

  // Render the component
  render(<NameInput />);

  // Check that the input field has the saved name as its value
  const input = screen.getByLabelText("Enter your name:");
  expect(input).toHaveValue(name);

  // Clear the saved name from local storage
  localStorage.removeItem("name");

  // Type a new name into the input field
  const newName = "Jane Doe";
  fireEvent.change(input, { target: { value: newName } });

  // Click the "Save" button
  const button = screen.getByText("Save");
  fireEvent.click(button);

  // Check that the name was saved to local storage
  expect(localStorage.getItem("name")).toBe(newName);

  // Check that the input field now has the new name as its value
  expect(input).toHaveValue(newName);
});