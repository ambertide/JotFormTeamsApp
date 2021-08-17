/**
 * Functions to help with interracting with the Poll API.
 */
import I from "immutable";

import { FrequencyResponseObject } from "interfaces/PollAPITypes";
import { FormAnswerDistribution } from "interfaces/ViewTypes";

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
