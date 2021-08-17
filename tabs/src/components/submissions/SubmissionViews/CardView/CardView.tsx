import { Flex, Grid } from "@fluentui/react-northstar";
import { ViewerProps } from "interfaces/ViewTypes";
import SubmissionCard from "./SubmissionCard";

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
      {submissions.submissions.map((submission, index) => (
        <SubmissionCard
          key={`${submission.submissionDate}${submission.ipAdress}${index}`}
          formTitle={formTitle}
          submission={submission}
          formQuestions={formQuestions}
        />
      ))}
    </Flex>
  );
}
