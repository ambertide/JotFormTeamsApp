import { SelectQuestionResponse } from "interfaces/JotFormApiResponses";

/**
 * In radio and checkbox question types, deconstruct special values to normal
 * options.
 * @param question A Question object that comes back from the JotForm API.
 */
export function deconstructSpecial(question: SelectQuestionResponse) {
  switch (question.special) {
    case "None":
      break;
    case "Days":
      question.options = "Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday";
      break;
    case "Months":
      question.options =
        "January|February|March|April|May|June|July|August|September|October|November|December";
      break;
    case "Gender":
      question.options = "Male|Female|N/A";
      break;
    default:
      break;
  }
}
