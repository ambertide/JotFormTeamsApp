import { ComponentStory, ComponentMeta } from "@storybook/react";
import I from "immutable";
import { FormList } from "components/Tab";
import { ArrowLeftIcon, Flex } from "@fluentui/react-northstar";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

export default {
  title: "Tab/FormList",
  component: FormList,
} as ComponentMeta<typeof FormList>;

const generateFakeForm = (id: number) => ({
  id: `${id}`,
  title: `Example Form ${id}`,
  url: "https://example.com",
  status: "ENABLED" as const,
  created_at: "12/07/2012 05:50:34",
  updated_at: "12/08/2012 06:50:45",
  count: 23,
});

const Template: ComponentStory<typeof FormList> = (args: any) => {
  const [lastIndex, setLastIndex] = useState(0);
  const [forms, setForms] = useState(I.List());
  const onScroll = useCallback(
    (lastRenderedIndex) => {
      if (lastRenderedIndex >= lastIndex - 5) {
        setForms(I.merge(forms, I.Range(lastIndex, lastIndex + 20).map(generateFakeForm)));
        setLastIndex((previousLastIndex) => previousLastIndex + 20);
      }
    },
    [lastIndex, setForms, setLastIndex, generateFakeForm]
  );
  useEffect(() => {
    onScroll(0);
  }, [onScroll]);

  return (
    <Flex style={{ height: "600px" }}>
      <FormList {...args} forms={forms} onFormScroll={onScroll} />
    </Flex>
  );
};

export const TabFormsList = Template.bind({});

TabFormsList.args = {
  buttonIcon: <ArrowLeftIcon />,
  buttonText: "Return to Main Page",
  isLite: false,
};
