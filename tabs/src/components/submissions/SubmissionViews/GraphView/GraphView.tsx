import { Segment, Flex, Dropdown, Divider, Loader } from "@fluentui/react-northstar";
import { MessageSegment } from "components/Extensions";
import { ViewerProps } from "interfaces/ViewTypes";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
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

export function GraphView({ formQuestions, distributions, isLoading }: ViewerProps) {
  const [questionID, setQuestionID] = useState(distributions?.keySeq().get(0));

  const listItems = useMemo(() => {
    const items = formQuestions
      .filter((questionName, qid) => distributions?.keySeq().contains(qid))
      .valueSeq()
      .toArray();
    console.log(items);
    return items;
  }, [formQuestions, distributions]);
  useEffect(() => {
    setQuestionID(formQuestions.findKey((value) => value === listItems[0]));
  }, [listItems, formQuestions, setQuestionID]);
  if (!isLoading && (!distributions || distributions?.isEmpty())) {
    // Despite loading being complete, still no data.
    return (
      <MessageSegment
        messageType="info"
        message="This poll either has no submissions yet, or it does not contain question that can be shown in a graph."
        fragment
      />
    );
  }
  return (
    <Flex hAlign="center" column>
      <Dropdown
        styles={{ width: "100%" }}
        items={listItems}
        value={formQuestions.get(questionID || "", "")}
        aria-label={"Select the question"}
        onChange={(event, data) =>
          setQuestionID(formQuestions.findKey((value) => value === data?.value))
        }
        checkable
        fluid
      />
      <Divider />
      {!distributions || distributions?.isEmpty() ? (
        <Loader />
      ) : (
        <Segment styles={{ width: "100%", maxHeight: "100%" }}>
          <ResponsiveContainer height="100%" aspect={3.5}>
            <PieChart>
              <Pie
                data={distributions?.get(questionID || "0")?.toArray()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="90%"
                label={true}
              >
                {distributions
                  ?.get(questionID || "0")
                  ?.map((entry, index) => (
                    <Cell key={index} fill={colours[index % colours.length]} />
                  ))
                  .toArray()}
              </Pie>
              <Legend align="left" layout="vertical" verticalAlign="top" />
            </PieChart>
          </ResponsiveContainer>
        </Segment>
      )}
    </Flex>
  );
}
