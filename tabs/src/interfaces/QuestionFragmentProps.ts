import { JotFormQuestionData } from "./JotFormTypes";

export default interface QuestionFragmentProps {
  /**
   * Callback used to add a new property to the active question.
   */
  addPropertyToQuestion: (propertyKey: string, propertyValue: string | number) => void;
  /**
   * The initial state of the question fragment, if provided, the inputs fields will be
   * populated by its values.
   */
  initialState?: JotFormQuestionData;
}
