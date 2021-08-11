import { Dropdown, Input, Flex, Box } from "@fluentui/react-northstar";
import { FullNameAnswer } from "interfaces/JotFormTypes/JotFormApiRequests";
import I from "immutable";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import "../Components.css";

type FullNameSubfields = keyof FullNameAnswer;

interface FullNameInputGroupProps {
  showMiddleName?: boolean;
  showSuffix?: boolean;
  showPrefix?: boolean;
  prefixList?: string[];
  onChange: (values: FullNameAnswer) => void;
}

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
