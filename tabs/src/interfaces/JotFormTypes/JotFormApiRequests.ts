import { SubmissionFieldAnswer } from "./JotFormCommons";
export interface PostSubmissionRequestContentInner {
  [key: string]: SubmissionFieldAnswer; // In practice this key is always "text".
}

export interface PostSubmissionRequestContent {
  [qid: string]: PostSubmissionRequestContentInner;
}

export type PostSubmissionRequest = PostSubmissionRequestContent[];
