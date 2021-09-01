import Poll from "components/TaskModule/Poll";
import { render, screen } from "__mocks__/test-utils";
import I from "immutable";
import * as user from "utils/user";

// Poll component's validity can be discerned from its button.
describe("Poll Component Validity Test Suite", () => {
  const questions = [
    {
      name: "whatIs",
      order: "1",
      qid: "1",
      required: "Yes" as const,
      text: "What is your name?",
      type: "control_fullname",
    },
    {
      maxsize: "60",
      name: "whatIs2",
      order: "2",
      qid: "2",
      required: "Yes" as const,
      text: "What is your email?",
      type: "control_textbox",
      validation: "Email",
    },
    {
      allowOther: "No" as const,
      name: "whatIs3",
      options: "Primary|Secondary|University",
      order: "3",
      qid: "3",
      required: "Yes" as const,
      special: "None",
      text: "What is your education?",
      type: "control_radio",
    },
    {
      allowOther: "Yes" as const,
      name: "whatIs4",
      options: "Vegaterian|Vegan",
      order: "4",
      otherText: "Other",
      qid: "4",
      required: "Yes" as const,
      special: "None",
      text: "What is your dietary choices?",
      type: "control_checkbox",
    },
  ];
  test.each(questions)(
    "It should not be in a valid state when %p is unfilled and required.",
    (question) => {
      const onSubmit = jest.fn();
      render(<Poll questions={I.List([question])} onSubmit={onSubmit} />);
      const button = screen.getByText("Submit").closest("button");
      expect(button).toBeDisabled();
    }
  );

  test.each(questions)(
    "It should be in a valid state if the question is not required and the answer to %p is empty.",
    (question) => {
      const onSubmit = jest.fn();
      render(
        <Poll questions={I.List([{ ...question, required: "No" as const }])} onSubmit={onSubmit} />
      );
      const button = screen.getByText("Submit").closest("button");
      expect(button).toBeEnabled();
      user.clicks(button as HTMLButtonElement);
      expect(onSubmit).toHaveBeenCalledTimes(1);
    }
  );
});
