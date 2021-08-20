import { Divider, Flex, Header, Segment, Loader } from "@fluentui/react-northstar";
import I from "immutable";
import { ViewComponent, ViewerProps, ViewType } from "interfaces/ViewTypes";
import { useState } from "react";
import ViewSwitcher from "./ViewSwitcher";
import * as viewsObject from "./SubmissionViews";
import { MessageSegment } from "components/Extensions";
import PageSwitcher from "./PageSwitcher";

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
  onPageChange: (page: number) => void;
  /**
   * Navigation button that will be placed on the page.
   */
  navButton?: JSX.Element;
  /**
   * Indicates whether or not this is the last page.
   */
  isLastPage?: boolean;
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
  onPageChange,
  isLastPage,
}: Props) {
  const [viewType, setViewType] = useState<ViewType>("List");
  return (
    <Segment styles={{ width: "90%", height: "90%" }}>
      <Flex column styles={{ minHeight: "100%", maxHeight: "100%" }}>
        <Flex>
          <Header content={`${formTitle} Submissions`} />
          <Flex style={{ marginLeft: "auto" }} gap="gap.small">
            {viewType !== "Graph" ? ( // Pages do not exist in Graph.
              <PageSwitcher
                onPageChange={onPageChange}
                isLastPage={isLastPage}
                isLoading={isLoading}
              />
            ) : null}
            {navButton}
            <ViewSwitcher currentState={viewType} setCurrentState={setViewType} />
          </Flex>
        </Flex>
        <Divider />
        {isLoading ? (
          <Loader />
        ) : submissions?.submissions.isEmpty() ? (
          <Flex vAlign="center" styles={{ height: "100%", width: "100%", flexGrow: 1 }}>
            <MessageSegment
              message="This poll has not recieved any submissions for now!"
              messageType="info"
              fragment
            />
          </Flex>
        ) : (
          generateView(viewType, {
            formTitle,
            formQuestions,
            submissions,
            distributions,
            isLoading,
          })
        )}
      </Flex>
    </Segment>
  );
}
