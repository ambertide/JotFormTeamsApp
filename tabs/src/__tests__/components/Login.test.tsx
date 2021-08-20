import Login, { LoginProps } from "components/Tab/Login";
import { render, screen } from "@testing-library/react";

describe("<Login>", () => {
  it("should render username, password, sign-in and sign up.", () => {
    render(<Login onSubmit={() => {}} />);
    const form = screen.getByTitle("Sign In to JotForm");
    expect(form).toBeInTheDocument();
    const username = screen.getByLabelText("JotForm Username");
    const password = screen.getByLabelText("Password");
    expect(form).toContainElement(username);
    expect(form).toContainElement(password);
    const loginButton = screen.getByText("Sign In");
    expect(loginButton).toBeEnabled();
    const signupButton = screen.getByText("Sign Up");
    expect(signupButton).toBeEnabled();
  });
});
