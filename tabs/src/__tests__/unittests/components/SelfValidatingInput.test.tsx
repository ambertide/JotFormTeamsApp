import * as user from "utils/user";
import SelfValidatingInput from "components/Extensions/SelfValidatingInput";
import { render, screen } from "@testing-library/react";

describe("Self Validating Input Component Tests", () => {
  it.each(["None", "Email"])(
    "should be in a valid state upon empty input when validation is %p.",
    async (validation) => {
      const setValidateState = jest.fn();
      render(
        <SelfValidatingInput
          validationType={validation as any}
          setValidateState={setValidateState}
        />
      );
      expect(setValidateState).toHaveBeenCalledTimes(1);
      expect(setValidateState).toHaveBeenCalledWith(true);
    }
  );

  test.each([
    ["None", "anytext"],
    ["Email", "example@example.com"],
  ])(
    "It should be in invalid state without valid input when require is true.",
    async (validation, validText) => {
      const setValidateState = jest.fn();
      render(
        <SelfValidatingInput
          validationType={validation as any}
          setValidateState={setValidateState}
          required
          label="input"
        />
      );
      expect(setValidateState).toHaveBeenCalledTimes(1);
      expect(setValidateState).toHaveBeenCalledWith(false);
      const input = screen.getByLabelText("input");
      user.types(input, validText);
      expect(setValidateState).toHaveBeenCalledWith(true);
    }
  );

  test.each([
    ["None", "anytext"],
    ["Email", "example@example.com"],
  ])(
    "It should stay valid when going from empty to filled to empty.",
    async (validation, validText) => {
      const setValidateState = jest.fn();
      render(
        <SelfValidatingInput
          validationType={validation as any}
          setValidateState={setValidateState}
          label="input"
        />
      );
      const input = screen.getByLabelText("input");
      user.types(input, validText);
      user.types(input, "");
      expect(setValidateState).not.toHaveBeenCalledWith(false); // All of this was valid.
    }
  );

  test.each([
    ["None", "anytext"],
    ["Email", "example@example.com"],
  ])(
    "It should turn invalid when we return to empty from valid text when required is true.",
    async (validation, validText) => {
      const setValidateState = jest.fn();
      render(
        <SelfValidatingInput
          validationType={validation as any}
          setValidateState={setValidateState}
          label="input"
          required
        />
      );
      const input = screen.getByLabelText("input");
      user.types(input, validText);
      user.types(input, "");
      expect(setValidateState).toHaveBeenLastCalledWith(false);
    }
  );

  test.each([false, true])(
    "It should start in valid state when the passed input is valid",
    (required) => {
      const setValidateState = jest.fn();
      render(
        <SelfValidatingInput
          validationType={"Email"}
          setValidateState={setValidateState}
          value="example@example.com" // A valid email.
          label="input"
          required={required}
        />
      );
      expect(setValidateState).toHaveBeenLastCalledWith(true);
    }
  );

  test.each([false, true])(
    // Test for both required and not required.
    "It should start in valid state when the passed defaultValue is valid",
    async (required) => {
      const setValidateState = jest.fn();
      render(
        <SelfValidatingInput
          validationType={"Email"}
          setValidateState={setValidateState}
          defaultValue="example@example.com" // A valid email.
          label="input"
          required={required}
        />
      );
      expect(setValidateState).toHaveBeenLastCalledWith(true);
    }
  );
});
