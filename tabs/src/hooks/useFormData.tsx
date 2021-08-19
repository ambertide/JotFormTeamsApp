import I from "immutable";
import { useCallback, useEffect, useState } from "react";
import { FormSubmissionResponseContent, QuestionResponse } from "interfaces/JotFormTypes";
import {
  FormAnswerDistribution,
  ProcessedFormSubmissions,
  QuestionAnswerDistribution,
} from "interfaces/ViewTypes";
import { processFormQuestions, processPollDistributions } from "utils/PollUtils";
import { processSubmissions } from "utils/JFUtils";
import { getPollStats } from "api/JFPollApi";
import { useMemo } from "react";
import useCount from "./useCount";

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
 * @returns Processed questions, submissions and distributions array, and
 * a boolean indicator to indicate whether or not the content loading
 * is complete.
 */
export default function useFormData(
  formName: string,
  getFormQuestions: () => Promise<QuestionResponse[]>,
  getUUID: () => Promise<string>,
  getSubmissions?: () => Promise<FormSubmissionResponseContent[]>
) {
  const { isFull: hasLoaded, incrementCount } = useCount(3);
  const indicateLoaded = useCallback(() => incrementCount(1), [incrementCount]);
  const [formQuestions, setFormQuestions] = useState(I.Map<string, string>());
  const [formSubmissions, setFormSubmissions] = useState<ProcessedFormSubmissions>({
    formName: formName,
    submissions: I.List(),
  });
  const [formDistributions, setFormDistributions] = useState<FormAnswerDistribution>(
    I.Map<string, I.List<QuestionAnswerDistribution>>()
  );

  useEffect(() => {
    getFormQuestions().then((questions) => {
      setFormQuestions(processFormQuestions(questions));
      indicateLoaded(); // Our questions are loaded.
    });
  }, [getFormQuestions, setFormQuestions, indicateLoaded]); // This use effect is to get the questions.
  useEffect(() => {
    if (formQuestions.isEmpty()) {
      return;
    }
    if (getSubmissions) {
      getSubmissions().then((submissions) => {
        setFormSubmissions(processSubmissions(submissions, formName));
        indicateLoaded();
      });
    } else {
      // If this does not exist we can just set this one to loaded.
      indicateLoaded();
    }
  }, [getSubmissions, setFormSubmissions, formQuestions, formName, indicateLoaded]);
  useEffect(() => {
    if (formQuestions.isEmpty()) {
      return;
    }
    // Register the user, get the poll's stats, process them and then set the form distribution.
    getUUID()
      .then((uuid) => {
        getPollStats(uuid).then((stats) => setFormDistributions(processPollDistributions(stats)));
        indicateLoaded();
      })
      .catch((e) => console.log("Err.", e));
  }, [getUUID, setFormDistributions, formQuestions, indicateLoaded]);
  return { formQuestions, formSubmissions, formDistributions, hasLoaded };
}
