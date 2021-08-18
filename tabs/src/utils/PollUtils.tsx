/**
 * Functions to help with interracting with the Poll API.
 */
import I from "immutable";
import { QuestionResponse } from "interfaces/JotFormTypes";

import { FrequencyResponseObject } from "interfaces/PollAPITypes";
import { FormAnswerDistribution } from "interfaces/ViewTypes";
import { isPollType } from "./JFUtils";

export function processPollDistributions(
  distributions: FrequencyResponseObject
): FormAnswerDistribution {
  return I.Map(distributions).map((distribution) =>
    I.Map(distribution).reduce(
      (reduction, value, answer) => reduction.push({ name: answer, value: value }), // Convert inner dictionary to array.
      I.List()
    )
  );
}

export function processFormQuestions(questions: QuestionResponse[]) {
  return I.List(questions).reduce(
    (reduction, question) =>
      isPollType(question.type) // Here we filter out the non-question questions.
        ? reduction.set(question.qid, question.text || "") // And then for others we get qid => text.
        : reduction,
    I.Map<string, string>()
  );
}
