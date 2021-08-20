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
import useTrackAll from "./useTrackAll";

type Resource = "questions" | "distributions" | "submissions";

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
  const { isAll: hasLoaded, setState } = useTrackAll<Resource>(
    ["questions", "distributions", "submissions"],
    false
  );
  // Utility function to set the resource state to loaded.
  const indicateLoaded = useCallback((resource: Resource) => setState(resource, true), [setState]);
  // Utiltiy function to set the resource state to loading.
  const indicateLoading = useCallback(
    (resource: Resource) => setState(resource, false),
    [setState]
  );
  const [formQuestions, setFormQuestions] = useState(I.Map<string, string>());
  const [formSubmissions, setFormSubmissions] = useState<ProcessedFormSubmissions>({
    formName: formName,
    submissions: I.List(),
  });
  const [formDistributions, setFormDistributions] = useState<FormAnswerDistribution>(
    I.Map<string, I.List<QuestionAnswerDistribution>>()
  );
  useEffect(() => {
    indicateLoading("questions");
    getFormQuestions().then((questions) => {
      setFormQuestions(processFormQuestions(questions));
      indicateLoaded("questions"); // Our questions are loaded.
    });
  }, [getFormQuestions, setFormQuestions, indicateLoaded, indicateLoading]); // This use effect is to get the questions.
  useEffect(() => {
    // Deals with submissions.
    if (formQuestions.isEmpty()) {
      indicateLoaded("submissions"); // If empty, already done.
      return;
    }
    indicateLoading("submissions"); // Set it back to the unloaded state.
    if (getSubmissions) {
      getSubmissions().then((submissions) => {
        setFormSubmissions(processSubmissions(submissions, formName));
        indicateLoaded("submissions");
      });
    } else {
      // If this does not exist we can just set this one to loaded.
      indicateLoaded("submissions");
    }
  }, [
    getSubmissions,
    setFormSubmissions,
    formQuestions,
    formName,
    indicateLoaded,
    indicateLoading,
  ]);
  useEffect(() => {
    if (formQuestions.isEmpty()) {
      indicateLoaded("distributions"); // For empty, no need to load
      return;
    }
    indicateLoading("distributions");
    // Register the user, get the poll's stats, process them and then set the form distribution.
    getUUID()
      .then((uuid) => {
        getPollStats(uuid).then((stats) => setFormDistributions(processPollDistributions(stats)));
        indicateLoaded("distributions");
      })
      .catch((e) => console.log("Err.", e));
  }, [getUUID, setFormDistributions, formQuestions, indicateLoaded, indicateLoading]);
  return { formQuestions, formSubmissions, formDistributions, hasLoaded };
}
