import { Card, CardHeader, CardFooter, CardBody, Flex, Divider } from "@fluentui/react-northstar";
import { ProcessedFormSubmission } from "interfaces/ViewTypes";
import { Text } from "@fluentui/react-northstar";
import SelectAnswerView from "./SelectAnswerView";
import I from "immutable";

interface SubmissionCardProps {
  /**
   * Title of the form.
   */
  formTitle: string;
  /**
   * A single submission, processed to be presentable.
   */
  submission: ProcessedFormSubmission;
  /**
   * Qid => Question Texts map of the form questions.
   */
  formQuestions: I.Map<string, string>;
}

/**
 * Represents a single submission on a form,
 * with possible actions to take on it.
 */
export default function SubmissionCard({
  formTitle,
  submission,
  formQuestions,
}: SubmissionCardProps) {
  return (
    <Card size="large" styles={{ maxWidth: "420px" }} elevated>
      <CardHeader>
        <Text content={formTitle} weight="bold" />
        <Text content={submission.submissionDate} />
        <Divider />
      </CardHeader>
      <CardBody styles={{ maxHeight: "320px", overflowY: "auto" }}>
        <CardBody>
          <Flex column gap="gap.medium" fill>
            {submission.answers.map((answer) => (
              <Flex column>
                <Text content={formQuestions.get(answer.qid)} weight="semibold" />
                {answer.type === "control_checkbox" ? (
                  answer.answer && Array.isArray(answer.answer) ? ( // This is an edge case related to malformed inputs.
                    <SelectAnswerView options={I.List(answer.answer as string[])} />
                  ) : null
                ) : (
                  <Text content={answer.processedAnswer} />
                )}
              </Flex>
            ))}
          </Flex>
        </CardBody>
      </CardBody>
    </Card>
  );
}
