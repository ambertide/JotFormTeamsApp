import { Grid, Segment, Pill, Flex, Input, Button, AddIcon } from "@fluentui/react-northstar";
import I from "immutable";
import "../Components.css";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { useEffect } from "react";
interface ChoiceAdderProps {
  /**
   * Choices already added to the list.
   */
  initialChoices: I.List<string>;
  /**
   * Callback to add properties to the parent.
   */
  setQuestionProperty: Dispatch<SetStateAction<I.Map<any, any>>>;
}
export default function ChoiceAdder(props: ChoiceAdderProps) {
  const { initialChoices, setQuestionProperty } = props;
  const [choices, setChoices] = useState(initialChoices);
  const [currentChoice, setCurrentChoice] = useState("");
  useEffect(() => {
    setCurrentChoice("");
    setQuestionProperty((previousQuestionProperties) =>
      previousQuestionProperties.set("options", choices.join("|"))
    );
  }, [choices]);
  return (
    <Segment styles={{ maxWidth: "350px" }} color="red">
      <Flex column gap="gap.smaller">
        <Grid styles={{ overflowX: "auto", minHeight: "135px", justifyContent: "left" }} rows={3}>
          {choices.map((choice, index) => (
            <Pill
              key={`${choice}${index}`}
              onDismiss={(e, data) => {
                console.log(data);
                setChoices((previousChoices) => {
                  return previousChoices.remove(index);
                });
              }}
              actionable
            >
              {choice}
            </Pill>
          ))}
        </Grid>

        <Flex>
          <Input
            className="redInputBox"
            fluid
            placeholder="Choice text"
            value={currentChoice}
            onChange={(event, data) => {
              setCurrentChoice(data?.value || "");
            }}
          />
          <Button
            icon={<AddIcon />}
            title="Add Choice"
            iconOnly
            onClick={() => {
              setChoices((previousChoices) => previousChoices.push(currentChoice));
            }}
          />
        </Flex>
      </Flex>
    </Segment>
  );
}
