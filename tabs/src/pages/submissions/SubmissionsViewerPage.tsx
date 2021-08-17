import SubmissionViewer from "components/submissions/SubmissionViewer";
import { useParams } from "react-router-dom";
import I from "immutable";
import {
  FormAnswerDistribution,
  ProcessedFormSubmissions,
  QuestionAnswerDistribution,
} from "interfaces/ViewTypes";
import { useState } from "react";
import { Button, Flex } from "@fluentui/react-northstar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectJFApiKey } from "rxutils/selectors";
import { getFormQuestions, getFormSubmissions } from "api/JFApi";
import { isPollType, processSubmissions } from "utils/JFUtils";
import { AnswerFrequency } from "interfaces/PollAPITypes";
import { getPollStats, registerUser } from "api/JFPollApi";
import { processPollDistributions } from "utils/PollUtils";
import useNavigation from "hooks/useNavigation";

interface SubmissionsViewURLParams {
  formID: string;
  formName: string;
}
export default function SubmissionsViewerPage() {
  const { formID, formName } = useParams<SubmissionsViewURLParams>();
  const [formQuestions, setFormQuestions] = useState(I.Map<string, string>());
  const navigateToMainPage = useNavigation("/results");
  const [formSubmissions, setFormSubmissions] = useState<ProcessedFormSubmissions>({
    formName: formName,
    submissions: I.List(),
  });
  const [formDistributions, setFormDistributions] = useState<FormAnswerDistribution>(
    I.Map<string, I.List<QuestionAnswerDistribution>>()
  );
  const apiKey = useSelector(selectJFApiKey);
  useEffect(() => {
    getFormQuestions(apiKey, formID).then((questions) =>
      setFormQuestions(
        I.List(questions).reduce(
          (reduction, question) =>
            isPollType(question.type) // Here we filter out the non-question questions.
              ? reduction.set(question.qid, question.text || "") // And then for others we get qid => text.
              : reduction,
          I.Map<string, string>()
        )
      )
    );
  }, [setFormQuestions, apiKey, formID]); // This use effect is to get the questions.
  useEffect(() => {
    if (formQuestions.isEmpty()) {
      return;
    }
    getFormSubmissions(apiKey, formID).then((submissions) =>
      setFormSubmissions(processSubmissions(submissions, formName))
    );
  }, [setFormSubmissions, formQuestions, apiKey, formID, formName]);
  useEffect(() => {
    if (formQuestions.isEmpty()) {
      return;
    }
    // Register the user, get the poll's stats, process them and then set the form distribution.
    registerUser(apiKey, formID)
      .then((uuid) =>
        getPollStats(uuid).then((stats) => setFormDistributions(processPollDistributions(stats)))
      )
      .catch((e) => console.log("Err.", e));
  }, [apiKey, formID, setFormDistributions, formQuestions]);
  return (
    <Flex hAlign="center" fill>
      <SubmissionViewer
        formTitle={formName}
        formQuestions={formQuestions}
        submissions={formSubmissions}
        distributions={formDistributions}
        navButton={<Button content="Return to Main Page" onClick={navigateToMainPage} />}
      />
    </Flex>
  );
}
