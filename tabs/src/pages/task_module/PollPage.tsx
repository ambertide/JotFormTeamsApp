import I from "immutable";
import { Flex, Header, Loader, Segment } from "@fluentui/react-northstar";
import { QuestionResponse, SubmissionFieldAnswer } from "interfaces/JotFormTypes";
import { useState } from "react";
import Poll from "components/TaskModule/Poll";
import { useEffect } from "react";
import * as teams from "@microsoft/teams-js";
import { useCallback } from "react";
import useNavigation from "hooks/useNavigation";
import { useParams } from "react-router-dom";
import { getPollQuestions, postSubmissionByProxy } from "api/JFPollApi";

interface PollURLParams {
  uuid: string; // This is a key that uniquely identifies the user/poll pair in the proxy.
  formName: string;
}

export default function PollPage() {
  const { uuid, formName } = useParams<PollURLParams>();
  const navigateToSuccess = useNavigation("/poll/submitted/success");
  const navigateToFailure = useNavigation("/poll/submitted/fail");
  const navigateToError = useNavigation("/poll/submitted/error");
  const [formQuestions, setFormQuestions] = useState<I.List<QuestionResponse>>();
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
      postSubmissionByProxy(uuid, formattedAnswers as any)
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
    [uuid, navigateToError, navigateToFailure, navigateToSuccess]
  );
  useEffect(() => {
    getPollQuestions(uuid).then((questions) => setFormQuestions(I.List(questions)));
  }, [setFormQuestions, uuid]);
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
