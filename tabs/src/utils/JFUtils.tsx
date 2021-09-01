import {
  HeaderQuestion,
  JotFormData,
  JotFormQuestionData,
  SubmitQuestion,
  SelectQuestionResponse,
  FormSubmissionResponseContent,
  FullNameQuestionResponse,
  FullNameAnswer,
} from "interfaces/JotFormTypes";
import I from "immutable";
import { ValidationType, ValidatorFunction, ValidatorStore } from "interfaces/ValidationTypes";
import validator from "validator";
import { ProcessedFormSubmissions } from "interfaces/ViewTypes";

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

/**
 * Add necessary decorative fields to the form for web usage.
 */
export function addDecorativeFields(formData: JotFormData) {
  const headerData: HeaderQuestion = {
    type: "control_head",
    text: formData.properties.title,
  };
  const submitButton: SubmitQuestion = {
    type: "control_button",
    text: "Submit Poll",
  };
  const maxKey = formData.questions
    .keySeq()
    .map((key) => Number.parseInt(key))
    .last();
  formData.questions = (
    formData.questions.mapKeys((order) => `${Number.parseInt(order) + 1}`) as I.Map<
      `${number}`,
      JotFormQuestionData
    >
  )
    .set("0", headerData) // Put the header in front.
    .set(`${(maxKey !== undefined ? maxKey : -1) + 2}`, submitButton); // Put the submit to the last.
}

const validatorStore: ValidatorStore = {
  None: () => true,
  Email: validator.isEmail,
  URL: validator.isURL,
  AlphaNumeric: validator.isAlphanumeric,
  Alphabetic: validator.isAlpha,
  Numeric: validator.isNumeric,
};

function dispatchValidator(validationType: ValidationType): ValidatorFunction {
  return validatorStore[validationType];
}

/**
 * Given a string and the type of validation to be performed,
 * perform the validation and return a boolean value indicating
 * whether the string is valid.
 * @param validatee String to be validated.
 * @param validationType Type of validation to be performed.
 * @param required If the empty string is invalid.
 * @returns Whether the string is valid.
 */
export function validateString(
  validatee: string,
  validationType: ValidationType,
  required: boolean
): boolean {
  if (validatee === "") {
    return !required;
  }
  const validator = dispatchValidator(validationType);
  return validator(validatee);
}

/**
 * Check if the type of the question is a poll type.
 * Used to filter control_head an control_button
 */
export function isPollType(questionType: string) {
  return questionType !== "control_head" && questionType !== "control_button";
}

/**
 * Converts the raw GET Submissions response to a
 * data type more suitable for usage in the app.
 */
export function processSubmissions(
  submissions: FormSubmissionResponseContent[],
  formName: string
): ProcessedFormSubmissions {
  return {
    formName: formName, // Get the form name.
    submissions: I.List(submissions).map((submission) => ({
      submissionID: submission.id,
      submissionDate: submission.created_at,
      ipAdress: submission.ip,
      answers: I.Map(submission.answers).reduce((reduction, answer, qid) => {
        // Convert each submissions answer.
        return reduction.push({
          // By first generating a map, and reducing it into a list.
          qid: qid,
          answer: answer.answer,
          processedAnswer: answer.prettyFormat || "",
          type: answer.type,
        });
      }, I.List()),
    })),
  };
}

/**
 * Check if the answer for the given full name question field is filled.
 * @param question Question to check the answer against.
 * @param answer Answer to check.
 * @returns True if the answer is valid.
 */
export function isFullNameFilled(question: FullNameQuestionResponse, answer: FullNameAnswer) {
  const requiredFields =
    [question.middle, question.prefix, question.suffix].filter((e) => e === "Yes").length + 2;
  const answers = Object.values(answer);
  return answers.length === requiredFields && answers.every((e) => e !== "" && e !== undefined);
}
