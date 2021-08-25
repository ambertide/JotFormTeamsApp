import { Avatar, Divider, Flex, Header, List, Segment, Button } from "@fluentui/react-northstar";
import { ToDoListIcon } from "@fluentui/react-icons-northstar";
import I from "immutable";
import React, { useState, useEffect } from "react";
import { JotFormMetadata } from "interfaces/JotFormTypes";
import ListItem from "interfaces/ListItem";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
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
  /**
   * Callback to be called once the form scrolls to content buffer.
   */
  onFormScroll?: (lastRenderedItem: number) => void;
}

interface ListProp {
  data: I.List<ListItem>;
  style: any;
  index: number;
}

const ListItemRow = React.memo(({ data, style, index }: ListProp) => {
  const item = data.get(index);
  return (
    <List.Item
      style={style}
      index={index}
      header={item?.header}
      media={item?.media}
      onClick={item?.onClick}
    />
  );
});

/**
 * Lists the forms belonging to a user.
 */
export default function FormList({
  forms,
  isLite,
  onFormSelect,
  buttonOnClick,
  buttonIcon,
  buttonText,
  hideButton,
  onFormScroll,
}: FormListProps) {
  const [listItems, setListItems] = useState<I.List<ListItem>>(I.List());
  useEffect(() => {
    setListItems(
      forms.map((form) => {
        return {
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
      <Flex column styles={{ maxHeight: "100%", height: "100%", width: "100%" }}>
        <Flex styles={{ width: "100%", overflowY: "hidden" }} vAlign="center">
          <Header as="h2" content="Your Polls" />
          {hideButton ? null : isLite ? (
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
          )}
        </Flex>
        <Divider />
        <Flex
          styles={{
            overflowY: "hidden",
            overflowX: "hidden",
            maxHeight: "100%",
            height: "100%",
            width: "100%",
          }}
        >
          <List
            styles={{
              width: "100%",
              height: "100%",
            }}
            title="Your Polls"
            navigable
          >
            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList
                  height={height}
                  itemCount={listItems.size}
                  itemData={listItems}
                  itemSize={50}
                  width={width}
                  onItemsRendered={({ visibleStopIndex }) =>
                    onFormScroll ? onFormScroll(visibleStopIndex) : null
                  }
                >
                  {ListItemRow}
                </FixedSizeList>
              )}
            </AutoSizer>
          </List>
        </Flex>
      </Flex>
    </Segment>
  );
}
