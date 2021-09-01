import { Flex, Segment } from "@fluentui/react-northstar";
import { GraphView } from "components/submissions/SubmissionViews/GraphView/GraphView";
import { PollURLParams } from "interfaces/PageURLParams";
import { useParams } from "react-router-dom";
import useFormData from "hooks/useFormData";
import { useCallback } from "react";
import { getPollQuestions } from "api/JFPollApi";
import { MessageSegment } from "components/Extensions";

/**
 * Shows the user the status of their submission.
 */
export default function SubmittedPage() {
  const { status } = useParams<{ status: "success" | "fail" | "error" }>();
  const { uuid, formName } = useParams<PollURLParams>();
  const getQuestions = useCallback(() => {
    return getPollQuestions(uuid);
  }, [uuid]);
  const getUUID = useCallback(() => Promise.resolve(uuid), [uuid]);
  const { formQuestions, formDistributions, hasLoaded } = useFormData(
    formName,
    getQuestions,
    getUUID
  );
  if (status !== "success") {
    return (
      <Flex column styles={{ position: "absolute", top: 0 }} fill>
        <Segment styles={{ width: "100%", height: "100%" }}>
          <MessageSegment messageType="error" message="Submission failed." fragment />
        </Segment>
      </Flex>
    );
  }
  return (
    <Flex column styles={{ position: "absolute", top: 0 }} fill>
      <Segment styles={{ width: "100%", height: "100%" }}>
        {hasLoaded ? (
          formDistributions.isEmpty() ? (
            <MessageSegment messageType="success" message="You have submitted an answer" fragment />
          ) : (
            <GraphView
              formTitle={""}
              formQuestions={formQuestions}
              distributions={formDistributions}
              isLoading={!hasLoaded}
            />
          )
        ) : (
          <MessageSegment
            messageType="loading"
            message="Your submission went through, loading other submissions..."
            fragment
          />
        )}
      </Segment>
    </Flex>
  );
}
