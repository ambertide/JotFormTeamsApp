import { Flex, Segment } from "@fluentui/react-northstar";
import useNavigation from "hooks/useNavigation";
import FormBuilder from "components/FormBuilder";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFormRequestAction } from "interfaces/reduxActions";
import { JotFormData } from "interfaces/JotFormData";
import reduxState from "interfaces/reduxState";
import { useState } from "react";
import { toast } from "react-toastify";

export default function FormBuilderPage() {
  const navigateToMainPage = useNavigation("/tab");
  const dispatch = useDispatch();
  const user = useSelector((state: reduxState) => state.auth);
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const dispatchSaveForm = useCallback(
    (formData: JotFormData) => {
      dispatch<createFormRequestAction>({
        type: "FORM_CREATE_REQUEST",
        apiKey: user.APIKey,
        formData: formData,
      });
      setSuccessfulCreation(true);
      toast("New poll created!", { type: "success" });
      setTimeout(navigateToMainPage, 1000);
    },
    [dispatch, user, navigateToMainPage]
  );
  return (
    <Flex styles={{ width: "100%" }} hAlign="center">
      <FormBuilder
        isLite={false}
        onSaveForm={dispatchSaveForm}
        buttonOnClick={navigateToMainPage}
        buttonContent="Return to Main Page"
      />
    </Flex>
  );
}
