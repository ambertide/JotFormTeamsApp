import { Dropdown, Input, Flex, Box } from "@fluentui/react-northstar";
import { FullNameAnswer } from "interfaces/JotFormTypes/JotFormCommons";
import I from "immutable";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import "../Components.css";

type FullNameSubfields = keyof FullNameAnswer;

interface FullNameInputGroupProps {
  /** If set to true, there will be an input field for middle name. */
  showMiddleName?: boolean;
  /** If set to true, there will be an input field for suffix. */
  showSuffix?: boolean;
  /** If set to true, there will be an input field for prefix. */
  showPrefix?: boolean;
  /**
   * If given, and showPrefix is also set to true, the prefix field
   * will consist of given options
   */
  prefixList?: string[];
  /** Callback to be called on input change. */
  onChange: (values: FullNameAnswer) => void;
}

/**
 * Used to represent JotForm's Full Name widget in the Poll
 * submission modals.
 */
export default function FullNameInputGroup(props: FullNameInputGroupProps) {
  const { showMiddleName, showSuffix, showPrefix, prefixList, onChange } = props;
  const [name, setName] = useState(I.Map<FullNameSubfields, string>());
  const setNameValue = useCallback(
    (fieldName: FullNameSubfields) => {
      return (value: string) => {
        setName((previousName) => previousName.set(fieldName, value));
      };
    },
    [setName]
  );
  useEffect(() => {
    onChange(name.toObject() as any);
  }, [name, onChange]);
  return (
    <>
      <Flex gap="gap.smaller">
        {showPrefix ? (
          prefixList ? (
            <Box styles={{ maxWidth: "70px", display: "box-inline" }}>
              <Dropdown
                items={prefixList}
                fluid
                checkable
                overflowBoundary="window"
                defaultValue={prefixList[0]}
                onChange={(event, data) =>
                  setNameValue("prefix")((data?.value || prefixList[0]) as any)
                }
              />
            </Box>
          ) : (
            <Input
              placeholder="Pr."
              styles={{ maxWidth: "60px" }}
              fluid
              onChange={(event, data) => setNameValue("prefix")(data?.value || "")}
            />
          )
        ) : null}
        <Input
          placeholder="First Name"
          styles={{ maxWidth: showMiddleName ? "120px" : "240px" }}
          onChange={(event, data) => setNameValue("first")(data?.value || "")}
          fluid
        />
        {showMiddleName ? (
          <Input
            placeholder="Middle Name"
            styles={{ maxWidth: "120px" }}
            fluid
            onChange={(event, data) => setNameValue("middle")(data?.value || "")}
          />
        ) : null}
        <Input
          placeholder="Last Name"
          styles={{ maxWidth: showMiddleName ? "120px" : "240px" }}
          onChange={(event, data) => setNameValue("last")(data?.value || "")}
          fluid
        />
        {showSuffix ? (
          <Input
            placeholder="Sf."
            styles={{ maxWidth: "60px" }}
            onChange={(event, data) => setNameValue("suffix")(data?.value || "")}
            fluid
          />
        ) : null}
      </Flex>
    </>
  );
}
