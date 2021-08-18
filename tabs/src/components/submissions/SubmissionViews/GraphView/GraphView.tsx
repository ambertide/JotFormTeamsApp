import { List, Segment, Text, Flex, Header, Divider, Loader } from "@fluentui/react-northstar";
import { ViewerProps } from "interfaces/ViewTypes";
import { useMemo } from "react";
import { useState } from "react";
import I from "immutable";
import { useCallback } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const colours = [
  "#51332C",
  "#833122",
  "#BD432C",
  "#E97548",
  "#EFDBD3",
  "#463100",
  "#FFAA44",
  "#F8D22A",
  "#F2E384",
  "#464775",
  "#9EA2FF",
  "#E2E2F6",
  "#DE569A",
  "#943670",
];

export function GraphView({ formTitle, formQuestions, distributions }: ViewerProps) {
  const [questionID, setQuestionID] = useState(distributions?.keySeq().get(0));
  const QuestionSelector = useCallback(() => {
    // A small memoised component to select questions.
    const listItems = formQuestions
      .filter((questionName, qid) => distributions?.keySeq().contains(qid)) // Filter the only questions with graph data.
      .reduce(
        (reduction, questionName, qid) =>
          reduction.push({
            key: qid,
            content: questionName,
            onClick: () => {
              // Clicking on a question should switch to that question.
              setQuestionID(qid);
            },
          }),
        I.List()
      ) // Convert to shorthand format.
      .toArray(); // Wihch also requires an array.
    return (
      <Segment styles={{ maxWidth: "240px", minHeight: "100%" }}>
        <Text content="Select a Question" weight="bold" />
        <List items={listItems as any} defaultSelectedIndex={0} selectable truncateContent={true} />
      </Segment>
    );
  }, [distributions, formQuestions]);
  return (
    <Flex fill gap="gap.medium" padding="padding.medium" styles={{ flexGrow: 1 }}>
      <QuestionSelector />
      <Segment styles={{ width: "100%", minHeight: "100%" }}>
        <Flex hAlign="center" fill column styles={{ flexGrow: 1 }}>
          <Header content={formQuestions.get(questionID || "0")} />
          <Divider />
          {!distributions || distributions?.isEmpty() ? (
            <Loader />
          ) : (
            <ResponsiveContainer height="100%">
              <PieChart>
                <Pie
                  data={distributions?.get(questionID || "0")?.toArray()}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  outerRadius="150%"
                  label={true}
                >
                  {distributions
                    ?.get(questionID || "0")
                    ?.map((entry, index) => <Cell fill={colours[index % colours.length]} />)
                    .toArray()}
                </Pie>
                <Legend align="left" layout="vertical" verticalAlign="top" />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Flex>
      </Segment>
    </Flex>
  );
}
