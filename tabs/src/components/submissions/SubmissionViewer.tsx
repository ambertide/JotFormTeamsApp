import { Divider, Flex, Header, Segment, Loader } from "@fluentui/react-northstar";
import I from "immutable";
import { ViewComponent, ViewerProps, ViewType } from "interfaces/ViewTypes";
import { useState } from "react";
import ViewSwitcher from "./ViewSwitcher";
import * as viewsObject from "./SubmissionViews";

const views = I.Map<ViewType, ViewComponent>(viewsObject as any);

/**
 * Given the type of a view and its props, generate a view.
 */
function generateView(viewType: ViewType, props: ViewerProps): JSX.Element | undefined {
  const ViewComponent = views.get(viewType, null);
  if (ViewComponent !== null) {
    return <ViewComponent {...props} />;
  }
}

interface Props extends ViewerProps {
  /**
   * Navigation button that can be put into the page.
   */
  navButton?: JSX.Element;
}

/**
 * A self contained component to view form submissions in a variety of ways.
 * @param param0
 */
export default function SubmissionViewer({
  formTitle,
  formQuestions,
  submissions,
  distributions,
  isLoading,
  navButton,
}: Props) {
  const [viewType, setViewType] = useState<ViewType>("List");
  return (
    <Segment styles={{ width: "90%", height: "90%" }}>
      <Flex column styles={{ minHeight: "100%", maxHeight: "100%" }}>
        <Flex>
          <Header content={`${formTitle} Submissions`} />
          <Flex style={{ marginLeft: "auto" }} gap="gap.small">
            {navButton}
            <ViewSwitcher currentState={viewType} setCurrentState={setViewType} />
          </Flex>
        </Flex>
        <Divider />
        {!formQuestions.isEmpty() ? (
          generateView(viewType, {
            formTitle,
            formQuestions,
            submissions,
            distributions,
            isLoading,
          })
        ) : (
          <Loader />
        )}
      </Flex>
    </Segment>
  );
}
