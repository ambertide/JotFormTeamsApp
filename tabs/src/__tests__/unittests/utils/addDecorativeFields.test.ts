import { addDecorativeFields } from "utils/JFUtils";
import I from "immutable";
import { JotFormQuestionData } from "interfaces/JotFormTypes";

describe("Add Decorative Fields Utility Function", () => {
  test.each([1, 4, 10])(
    "It should take add two questions to its submissions.",
    (questionCount: number) => {
      const exampleQuestions: I.Map<`${number}`, JotFormQuestionData> = I.Range(0, questionCount)
        .map((questionID) => ({ type: "control_fullname", text: `${questionID}` }))
        .reduce(
          (reduction, value, key) => reduction.set(`${key}`, value as any),
          I.Map<`${number}`, JotFormQuestionData>()
        );
      const exampleFormData = {
        properties: { title: "Example Form" },
        questions: exampleQuestions,
      };
      addDecorativeFields(exampleFormData);
      expect(exampleFormData.questions.size).toEqual(exampleQuestions.size + 2);
      expect(
        exampleFormData.questions.valueSeq().toSet().isSuperset(exampleQuestions.valueSeq().toSet())
      );
    }
  );
});
