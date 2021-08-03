import { Flex, Segment } from "@fluentui/react-northstar";
import useNavigation from "hooks/useNavigation";
import FormBuilder from "components/FormBuilder";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFormRequestAction } from "interfaces/reduxActions";
import { JotFormData } from "interfaces/JotFormData";
import reduxState from "interfaces/reduxState";

export default function FormBuilderPage() {
  const navigateToMainPage = useNavigation("/tab");
  const dispatch = useDispatch();
  const user = useSelector((state: reduxState) => state.auth);
  const dispatchSaveForm = useCallback(
    (formData: JotFormData) => {
      dispatch<createFormRequestAction>({
        type: "FORM_CREATE_REQUEST",
        apiKey: user.APIKey,
        formData: formData,
      });
      navigateToMainPage();
    },
    [dispatch, user, navigateToMainPage]
  );
  return (
    <Flex styles={{ width: "100%" }} hAlign="center">
      <FormBuilder isLite={false} onSaveForm={dispatchSaveForm} />
    </Flex>
  );
}
