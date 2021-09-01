import { Flex } from "@fluentui/react-northstar";
import { ViewerProps } from "interfaces/ViewTypes";
import SubmissionCard from "./SubmissionCard";

/**
 * Used to display multiple submissions in a card view.
 */
export function CardView({ formQuestions, formTitle, submissions }: ViewerProps) {
  return (
    <Flex
      wrap
      gap="gap.medium"
      hAlign="center"
      styles={{ overflowY: "auto", rowGap: "20px" }}
      padding="padding.medium"
      space="evenly"
    >
      {submissions?.submissions.map((submission) => (
        <SubmissionCard
          key={`${submission.submissionID}`}
          formTitle={formTitle}
          submission={submission}
          formQuestions={formQuestions}
        />
      ))}
    </Flex>
  );
}
