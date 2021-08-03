export default interface QuestionFragmentProps {
  /**
   * Callback used to add a new property to the active question.
   */
  addPropertyToQuestion: (propertyKey: string, propertyValue: string | number) => void;
}
