import I from "immutable";

export interface PorcessedSubmissionAnswer {
  qid: string /** Question ID the answer is for. */;
  type: string /** Type of the question. */;
  answer: any /** Unprocessed answer. */;
  processedAnswer: string /** Actual text of the answer. */;
}

export interface ProcessedFormSubmission {
  submissionID: string;
  answers: I.List<PorcessedSubmissionAnswer> /** Sorted by question order. */;
  submissionDate: string;
  ipAdress: string;
}

/** This is the state of submissions after processing. */
export interface ProcessedFormSubmissions {
  formName: string;
  submissions: I.List<ProcessedFormSubmission>;
}

export type ViewType = "List" | "Cards" | "Graph";

export interface ViewerProps {
  /**
   * Title of the form.
   */
  formTitle: string;
  /**
   * Questions of the form, Question ID to Question text.
   */
  formQuestions: I.Map<string, string>; // Qid => Question Text
  /**
   * Submissions of the form processed to the desired type.
   */
  submissions?: ProcessedFormSubmissions;
  /**
   * Distributions of the answer.
   */
  distributions?: FormAnswerDistribution;
  /**
   * Indicates if the questions are still loading..
   */
  isLoading: boolean;
}

/**
 * Type used to denote view components.
 */
export type ViewComponent = (props: ViewerProps) => JSX.Element;

export interface QuestionAnswerDistribution {
  name: string /** Question answer */;
  value: number /** Number of answers. */;
}

export type FormAnswerDistribution = I.Map<
  string,
  I.List<QuestionAnswerDistribution>
>; /** Qid => Distrubition */
