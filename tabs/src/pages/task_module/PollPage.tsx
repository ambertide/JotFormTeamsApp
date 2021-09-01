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
import { PollURLParams } from "interfaces/PageURLParams";

/**
 * Page used by external users to answera poll.
 */
export default function PollPage() {
  const { uuid, formName } = useParams<PollURLParams>();
  const navigateToSuccess = useNavigation(`/poll/${uuid}/${formName}/submitted/success`);
  const navigateToFailure = useNavigation(`/poll/${uuid}/${formName}/submitted/fail`);
  const navigateToError = useNavigation(`/poll/${uuid}/${formName}/submitted/error`);
  const [formQuestions, setFormQuestions] = useState<I.List<QuestionResponse>>();
  const onSubmit = useCallback(
    (answers: I.Map<string, string | SubmissionFieldAnswer>) => {
      const formattedAnswers = [
        answers
          .map((value) => {
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
          if (result) {
            navigateToSuccess();
          } else {
            setTimeout(() => {
              teams.tasks.submitTask();
            }, 1000);
            navigateToFailure();
          }
        })
        .catch(() => {
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
