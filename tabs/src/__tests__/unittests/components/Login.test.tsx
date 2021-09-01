import * as user from "utils/user";
import Login from "components/Tab/Login";
import { render, screen } from "@testing-library/react";
describe("Login Segment Component Test", () => {
  it("should render username, password, sign-in and sign up.", () => {
    render(
      <Login
        onSubmit={() => {
          console.log("here!");
        }}
      />
    );
    const form = screen.getByTitle("Sign In to JotForm");
    expect(form).toBeInTheDocument();
    const username = screen.getByLabelText("JotForm Username");
    const password = screen.getByLabelText("Password");
    expect(form).toContainElement(username);
    expect(form).toContainElement(password);
    const loginButton = screen.getByText("Sign In").closest("button");
    expect(loginButton).toBeEnabled();
    const signupButton = screen.getByText("Sign Up").closest("button");
    expect(signupButton).toBeEnabled();
  });

  it("should pass the username and password the on submit function.", async () => {
    const mockSubmit = jest.fn();
    render(<Login onSubmit={mockSubmit} />);
    user.types(screen.getByLabelText("JotForm Username"), "test_username");
    user.types(screen.getByLabelText("Password"), "test_password");
    user.clicks(screen.getByText("Sign In"));
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith("test_username", "test_password");
  });
});
