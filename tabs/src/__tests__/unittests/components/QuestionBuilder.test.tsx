import * as user from "utils/user";
import { render, screen } from "../../../__mocks__/test-utils";
import QuestionBuilder from "components/Tab/QuestionBuilder";
describe("Question Builder Component Validation State Test", () => {
  let button: HTMLElement, input: HTMLElement;
  let onSave: jest.Mock<any, any>;

  beforeEach(() => {
    onSave = jest.fn((results) => results);
    render(
      <QuestionBuilder
        onSaveQuestion={onSave}
        isLite={false}
        onClickSecondary={() => {
          return;
        }}
        secondaryButtonTitle={"Test"}
        buttonTitle={"Save Question"}
      />
    );
    const possiblyButton = screen.getByText("Save Question").closest("button");
    expect(possiblyButton).toBeInTheDocument();
    button = possiblyButton as HTMLElement;
    input = screen.getByLabelText("Text area size");
  });

  test("Save button should start disabled when required input is empty.", () => {
    expect(input).toHaveValue("");
    expect(button).toBeDisabled();
  });

  test("Save button should remain disabled if input is invalid.", () => {
    user.types(input, "invalid input.");
    expect(button).toBeDisabled();
  });

  test("Save button should become enabled if input is valid.", () => {
    user.types(input, "1");
    expect(button).toBeEnabled();
  });

  test("Valid input should be passed to the callback function.", () => {
    user.types(input, "1");
    user.clicks(button);
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenLastCalledWith({
      maxsize: "1",
      required: "No",
      text: "My Question",
      type: "control_textbox",
    });
  });
});
