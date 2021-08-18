import { Table, Text } from "@fluentui/react-northstar";
import { ViewerProps } from "interfaces/ViewTypes";
import { useMemo } from "react";

export function TableView({ formQuestions, formTitle, submissions }: ViewerProps) {
  const header = useMemo(
    () => ({
      key: `${formTitle}header`,
      items: formQuestions
        .valueSeq()
        .map((header) => <Text content={header} weight="bold" />)
        .toArray(),
    }),
    [formQuestions]
  );
  const rows = useMemo(() => {
    const questionIDs = formQuestions.keySeq().toList();
    return submissions.submissions
      .map((submission, index) => ({
        key: `${submission.submissionID}`,
        items: questionIDs
          .map((questionID) => ({
            key: `${submission.submissionID}${questionID}`,
            content: submission.answers.find((answer) => answer.qid === questionID)
              ?.processedAnswer,
          }))
          .toArray(),
      }))
      .toArray();
  }, [submissions, formQuestions]);
  return <Table header={header} rows={rows} styles={{ maxHeight: "100%", overflowY: "auto" }} />;
}
