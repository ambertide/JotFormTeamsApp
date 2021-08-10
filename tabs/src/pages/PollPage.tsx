import I from "immutable";
import { Flex, Header, Loader, Segment } from "@fluentui/react-northstar";
import { QuestionResponse } from "interfaces/JotFormApiResponses";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import Poll from "components/TaskModule/Poll";
import { useEffect } from "react";
import { getFormQuestions, postSubmission } from "api/JFApi";
import * as teams from "@microsoft/teams-js";
import { useCallback } from "react";
import { SubmissionFieldAnswer } from "interfaces/JotFormApiRequests";
import useNavigation from "hooks/useNavigation";

interface PollURLParams {
  formID: string;
  apiKey: string;
  formName: string;
}

export default function PollPage() {
  const { formID, apiKey, formName } = useParams<PollURLParams>();
  const navigateToSuccess = useNavigation("/submitted/success");
  const navigateToFailure = useNavigation("/submitted/fail");
  const navigateToError = useNavigation("/submitted/error");
  const [formQuestions, setFormQuestions] = useState<I.List<QuestionResponse>>();
  const [hasErrorOccurred, setHasErrorOccurred] = useState(false);
  const onSubmit = useCallback(
    (answers: I.Map<string, string | SubmissionFieldAnswer>) => {
      const formattedAnswers = [
        answers
          .map((value, key) => {
            if (typeof value === "string") {
              return { text: value };
            } else {
              return value;
            }
          })
          .toObject(),
      ];
      postSubmission(apiKey, formID, formattedAnswers as any)
        .then((result) => {
          setTimeout(() => {
            teams.tasks.submitTask();
          }, 1000);
          if (result) {
            navigateToSuccess();
          } else {
            navigateToFailure();
          }
        })
        .catch((err) => {
          setTimeout(() => {
            teams.tasks.submitTask();
          }, 1000);
          navigateToError();
        });
    },
    [postSubmission, apiKey, formID]
  );
  useEffect(() => {
    getFormQuestions(apiKey, formID)
      .then((questions) => setFormQuestions(I.List(questions)))
      .catch((err) => setHasErrorOccurred(true));
  }, [setFormQuestions, formID, apiKey]);
  return (
    <Flex column styles={{ position: "absolute", top: 0, width: "100%" }}>
      <Segment>
        <Header>{formQuestions?.isEmpty() ? "Loading..." : formName}</Header>
      </Segment>
      {formQuestions === undefined || formQuestions?.isEmpty() ? (
        <Loader />
      ) : (
        <Poll questions={formQuestions as I.List<QuestionResponse>} onSubmit={onSubmit} />
      )}
    </Flex>
  );
}
