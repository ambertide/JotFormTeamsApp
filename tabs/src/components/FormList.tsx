import { Flex, Header, List, Segment } from "@fluentui/react-northstar";
import reduxState from "interfaces/reduxState";
import React from "react";
import I from "immutable";
import { useEffect } from "react";
import { useState } from "react";
import JotFormForm from "interfaces/JotFormForm";
import ListItem from "interfaces/ListItem";

interface FormProps {
  forms: I.List<JotFormForm>;
}

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
        };
      })
    );
  }, [forms]);
  return (
    <Segment>
      <Flex column>
        <Header content="Your Forms" />
        <List
          styles={{
            width: "45%",
          }}
          navigable
          items={listItems.toArray()}
        />
      </Flex>
    </Segment>
  );
}
