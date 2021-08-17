/**
 * Types used in the proxy poll API
 */

/**
 * Reprsents the frequency of answers in each question.
 */
export interface FrequencyResponseObject {
  [qid: string]: AnswerFrequency;
}

/**
 * Represents the frequency of an answer.
 */
export interface AnswerFrequency {
  [answer: string]: number;
}

/**
 * Returned after registering the App key with the User ID and Poll ID
 */
export interface PollRegisterResponse {
  uuid: string /** The UUID associating the user and poll with the system. */;
}
