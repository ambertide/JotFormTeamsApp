import reduxState from "interfaces/reduxState";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import I from "immutable";
import FormList from "components/FormList";
import { ArrowLeftIcon, Button, Flex } from "@fluentui/react-northstar";
import useNavigation from "hooks/useNavigation";

export default function FormsPage() {
  const forms = useSelector((auth: reduxState) => auth.forms);
  const user = useSelector((auth: reduxState) => auth.auth);
  const dispatch = useDispatch();
  const navigateToMainPage = useNavigation("/tab");
  useEffect(() => {
    dispatch({ type: "FORMS_REQUEST", apiKey: user.APIKey });
  }, [dispatch, user.APIKey]);
  return (
    <Flex hAlign="center" fill>
      <FormList
        forms={forms}
        isLite={false}
        buttonOnClick={navigateToMainPage}
        buttonIcon={<ArrowLeftIcon />}
        buttonText={"Return to Main Page"}
      />
    </Flex>
  );
}
