import { Avatar, Divider, Flex, Header, List, Segment, Button } from "@fluentui/react-northstar";
import { ToDoListIcon } from "@fluentui/react-icons-northstar";
import I from "immutable";
import { useState, useEffect } from "react";
import { AddIcon } from "@fluentui/react-icons-northstar";
import JotFormForm from "interfaces/JotFormForm";
import ListItem from "interfaces/ListItem";

interface FormProps {
  forms: I.List<JotFormForm>;
}

/**
 * Lists the forms belonging to a user.
 */
export default function FormList(props: FormProps) {
  const { forms } = props;
  const [listItems, setListItems] = useState<I.List<ListItem>>(I.List());
  useEffect(() => {
    setListItems(
      forms.map((form) => {
        return {
          key: form.id,
          header: form.title,
          headerMedia: form.updated_at,
          media: <Avatar icon={<ToDoListIcon />} square />,
        };
      })
    );
  }, [forms]);
  return (
    <Segment style={{ height: "100%" }}>
      <Flex column>
        <Flex styles={{ width: "100%" }} vAlign="center">
          <Header as="h2" content="Your Forms" />
          <Button icon={<AddIcon />} iconOnly title="Add Form" style={{ marginLeft: "auto" }} />
        </Flex>
        <Divider />
        <List
          styles={{
            width: "100%",
          }}
          navigable
          items={listItems.toArray()}
        />
      </Flex>
    </Segment>
  );
}
