import I from "immutable";
import { useEffect, useState } from "react";
import { FormSubmissionResponseContent, QuestionResponse } from "interfaces/JotFormTypes";
import {
  FormAnswerDistribution,
  ProcessedFormSubmissions,
  QuestionAnswerDistribution,
} from "interfaces/ViewTypes";
import { processFormQuestions, processPollDistributions } from "utils/PollUtils";
import { processSubmissions } from "utils/JFUtils";
import { getPollStats } from "api/JFPollApi";

/**
 * A hook used to get submission and statistical data
 * about a form.
 * @param formName Name of the form.
 * @param getFormQuestions A function that returns a promise to the
 *  form questions.
 * @param getUUID A function that returns a promise for the UUID key
 *  of the proxy server.
 * @param getSubmissions A function that returns a promise to the
 *  form submissions.
 * @returns Processed questions, submissions and distributions array.
 */
export default function useFormData(
  formName: string,
  getFormQuestions: () => Promise<QuestionResponse[]>,
  getUUID: () => Promise<string>,
  getSubmissions?: () => Promise<FormSubmissionResponseContent[]>
) {
  const [formQuestions, setFormQuestions] = useState(I.Map<string, string>());
  const [formSubmissions, setFormSubmissions] = useState<ProcessedFormSubmissions>({
    formName: formName,
    submissions: I.List(),
  });
  const [formDistributions, setFormDistributions] = useState<FormAnswerDistribution>(
    I.Map<string, I.List<QuestionAnswerDistribution>>()
  );

  useEffect(() => {
    getFormQuestions().then((questions) => setFormQuestions(processFormQuestions(questions)));
  }, [getFormQuestions, setFormQuestions]); // This use effect is to get the questions.
  useEffect(() => {
    if (formQuestions.isEmpty()) {
      return;
    }
    if (getSubmissions) {
      getSubmissions().then((submissions) =>
        setFormSubmissions(processSubmissions(submissions, formName))
      );
    }
  }, [getSubmissions, setFormSubmissions, formQuestions, formName]);
  useEffect(() => {
    if (formQuestions.isEmpty()) {
      return;
    }
    // Register the user, get the poll's stats, process them and then set the form distribution.
    getUUID()
      .then((uuid) =>
        getPollStats(uuid).then((stats) => setFormDistributions(processPollDistributions(stats)))
      )
      .catch((e) => console.log("Err.", e));
  }, [getUUID, setFormDistributions, formQuestions]);
  return { formQuestions, formSubmissions, formDistributions };
}
