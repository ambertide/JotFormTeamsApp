import { Button, Divider, Flex, Header, Segment } from "@fluentui/react-northstar";
import { GraphView } from "components/submissions/SubmissionViews/GraphView/GraphView";
import { PollURLParams } from "interfaces/PageURLParams";
import { FormAnswerDistribution, ProcessedFormSubmissions } from "interfaces/ViewTypes";
import { useState } from "react";
import { useParams } from "react-router-dom";
import I from "immutable";
import { useEffect } from "react";
import useFormData from "hooks/useFormData";
import { useCallback } from "react";
import { getPollQuestions } from "api/JFPollApi";

export default function SubmittedPage() {
  const { status } = useParams<{ status: "success" | "fail" | "error" }>();
  const { uuid, formName } = useParams<PollURLParams>();
  const getQuestions = useCallback(() => {
    return getPollQuestions(uuid);
  }, [uuid]);
  const getUUID = useCallback(() => Promise.resolve(uuid), [uuid]);
  const { formQuestions, formDistributions } = useFormData(formName, getQuestions, getUUID);
  return (
    <Flex column styles={{ position: "absolute", top: 0 }} fill>
      <Segment styles={{ width: "100%", height: "100%" }}>
        <Header>
          {status === "success" ? "Submitted Your Answers!" : "An Error Has Occurred."}
        </Header>
        <Divider />
        <GraphView formTitle={""} formQuestions={formQuestions} distributions={formDistributions} />
      </Segment>
    </Flex>
  );
}
