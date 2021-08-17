import { Avatar, Divider, Flex, Header, List, Segment, Button } from "@fluentui/react-northstar";
import { ToDoListIcon } from "@fluentui/react-icons-northstar";
import I from "immutable";
import { useState, useEffect } from "react";
import { JotFormMetadata } from "interfaces/JotFormTypes";
import ListItem from "interfaces/ListItem";

interface FormListProps {
  /**
   * An immutable list of form information.
   */
  forms: I.List<JotFormMetadata>;
  /**
   * Whether or not the component should be displayed in lite mode.
   */
  isLite: boolean;
  /**
   * Text to be shown on the button.
   */
  buttonText: string;
  /**
   * onClick callback of the button.
   */
  buttonOnClick: () => void;
  /**
   * Icon of the button on lite mode.
   */
  buttonIcon: JSX.Element;
  /**
   * URL of the poll.
   */
  onFormSelect: (formID: string, formName: string) => void;
  /**
   * If true, hide the button on top right.
   */
  hideButton?: boolean;
}

/**
 * Lists the forms belonging to a user.
 */
export default function FormList(props: FormListProps) {
  const { forms, isLite, onFormSelect, buttonOnClick, buttonIcon, buttonText, hideButton } = props;
  const [listItems, setListItems] = useState<I.List<ListItem>>(I.List());
  useEffect(() => {
    setListItems(
      forms.map((form) => {
        return {
          key: form.id,
          header: form.title,
          headerMedia: isLite ? "" : form.updated_at,
          media: <Avatar icon={<ToDoListIcon />} square />,
          onClick: () => {
            onFormSelect(form.id, form.title);
          },
        };
      })
    );
  }, [forms, isLite, onFormSelect]);
  return (
    <Segment style={{ height: "90%", width: "90%" }} className={isLite ? "lite" : ""}>
      <Flex column styles={{ maxHeight: "100%" }}>
        <Flex styles={{ width: "100%" }} vAlign="center">
          <Header as="h2" content="Your Polls" />
          {hideButton ||
            (isLite ? (
              <Button
                icon={buttonIcon}
                iconOnly
                title={buttonText}
                style={{ marginLeft: "auto" }}
                onClick={buttonOnClick}
              />
            ) : (
              <Button
                content={buttonText}
                title={buttonText}
                style={{ marginLeft: "auto" }}
                onClick={buttonOnClick}
              />
            ))}
        </Flex>
        <Divider />
        <Flex styles={{ overflowY: "auto", maxHeight: "100%" }}>
          <List
            styles={{
              width: "100%",
            }}
            navigable
            items={listItems.toArray()}
          />
        </Flex>
      </Flex>
    </Segment>
  );
}
