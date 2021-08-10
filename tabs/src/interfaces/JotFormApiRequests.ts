import I from "immutable";
export interface PostSubmissionRequestContentInner {
  [key: string]: SubmissionFieldAnswer; // In practice this key is always "text".
}

export interface PostSubmissionRequestContent {
  [qid: string]: PostSubmissionRequestContentInner;
}

export type PostSubmissionRequest = PostSubmissionRequestContent[];

export interface FullNameAnswer {
  first: string;
  last: string;
  prefix?: string;
  middle?: string;
  suffix?: string;
}

interface TextAnswer {
  text: string;
}

export type SubmissionFieldAnswer = FullNameAnswer | I.List<string> | TextAnswer;
