import { Flex, Header, List, Segment } from "@fluentui/react-northstar";
import reduxState from "interfaces/reduxState";
import React from "react";
import { List as IList } from "immutable";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JotFormTable from "interfaces/JotFormTable";

export default function Forms() {
  const forms = useSelector((auth: reduxState) => auth.forms);
  const user = useSelector((auth: reduxState) => auth.auth);
  const dispatch = useDispatch();
  const [formItems, setFormItems] = useState<IList<any>>(IList());
  useEffect(() => {
    if (forms.isEmpty()) {
      dispatch({ type: "FORMS_REQUEST", apiKey: user.APIKey });
    } else {
      setFormItems(
        forms.map((form) => {
          return {
            key: form.id,
            header: form.title,
            headerMedia: form.updated_at,
          };
        })
      );
    }
  }, [setFormItems, forms, user.APIKey, dispatch]);
  return (
    <Segment>
      <Flex column>
        <Header content="Your Forms" />
        <List
          styles={{
            width: "45%",
          }}
          navigable
          items={formItems.toArray()}
        />
      </Flex>
    </Segment>
  );
}
