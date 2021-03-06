import { Flex, Segment } from "@fluentui/react-northstar";
import useNavigation from "hooks/useNavigation";
import FormBuilder from "components/Tab/FormBuilder";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFormRequestAction } from "interfaces/reduxActions";
import { JotFormData } from "interfaces/JotFormTypes";
import { useState } from "react";
import { showSuccess } from "utils/messaging";
import { selectJFApiKey } from "rxutils/selectors";
import { MessageSegment } from "components/Extensions";

/**
 * Page used to host the form builder.
 */
export default function FormBuilderPage() {
  const navigateToMainPage = useNavigation("/tab");
  const dispatch = useDispatch();
  const JFApiKey = useSelector(selectJFApiKey);
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const dispatchSaveForm = useCallback(
    (formData: JotFormData) => {
      dispatch<createFormRequestAction>({
        type: "FORM_CREATE_REQUEST",
        apiKey: JFApiKey,
        formData: formData,
      });
      setSuccessfulCreation(true);
      showSuccess("New poll created!");
      setTimeout(navigateToMainPage, 1000);
    },
    [dispatch, JFApiKey, navigateToMainPage]
  );
  return !successfulCreation ? (
    <Flex styles={{ width: "100%", height: "100%" }} hAlign="center">
      <FormBuilder
        isLite={false}
        onSaveForm={dispatchSaveForm}
        buttonOnClick={navigateToMainPage}
        buttonContent="Return to Main Page"
      />
    </Flex>
  ) : (
    <Flex fill hAlign="center">
      <Segment styles={{ width: "90%", height: "90%" }}>
        <MessageSegment message="Poll created." messageType="success" fragment />
      </Segment>
    </Flex>
  );
}
