import { Flex, Header, Segment } from "@fluentui/react-northstar";
import { useParams } from "react-router-dom";

export default function SubmittedPage() {
  const { status } = useParams<{ status: "success" | "fail" | "error" }>();
  return (
    <Flex column styles={{ position: "absolute", top: 0 }}>
      <Segment>
        <Header>
          {status === "success" ? "Submitted Your Answers!" : "An Error Has Occurred."}
        </Header>
      </Segment>
    </Flex>
  );
}
