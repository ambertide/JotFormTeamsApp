import { Ref, Table, Text } from "@fluentui/react-northstar";
import { ViewerProps } from "interfaces/ViewTypes";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
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
    [formQuestions, formTitle]
  );
  const [tableWidth, setTableWidth] = useState(0);
  const tableReference = useRef<HTMLTableElement>(null);
  const onResize = useCallback(() => {
    setTableWidth(tableReference.current?.getBoundingClientRect().width || 0);
  }, [tableReference, setTableWidth]);
  useEffect(() => {
    window.addEventListener("resize", onResize);
  }, [window, onResize]);
  const rows = useMemo(() => {
    const questionIDs = formQuestions.keySeq().toList();
    return submissions?.submissions
      .map((submission) => ({
        key: `${submission.submissionID}`,
        items: questionIDs
          .map((questionID) => ({
            key: `${submission.submissionID}${questionID}`,
            content: submission.answers.find((answer) => answer.qid === questionID)
              ?.processedAnswer,
            truncateContent: tableWidth < 900,
          }))
          .toArray(),
      }))
      .toArray();
  }, [submissions, formQuestions, tableWidth]);
  return (
    <Ref innerRef={tableReference}>
      <Table
        header={header}
        variables={{
          cellContentOverflow: "none",
        }}
        rows={rows}
        styles={{ maxHeight: "100%", overflowY: "auto", minWidth: "fit-content" }}
        compact
      />
    </Ref>
  );
}
