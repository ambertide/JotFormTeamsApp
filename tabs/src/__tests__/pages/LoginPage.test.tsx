import * as user from "utils/user";
import LoginPage from "pages/LoginPage";
import { showError } from "utils/messaging";
import { render, screen, waitFor } from "__mocks__/test-utils";

jest.mock("utils/messaging"); // Mock the messages.

describe("<LoginPage>", () => {
  afterEach(() => {
    jest.useRealTimers();
  });
  it("should warn the user if they input wrong credentials.", async () => {
    render(<LoginPage />);
    user.types(screen.getByLabelText("JotForm Username"), "test_username");
    user.types(screen.getByLabelText("Password"), "test_password");
    user.clicks(screen.getByText("Sign In"));
    await waitFor(() => expect(showError).toHaveBeenCalledTimes(1));
  });
});
