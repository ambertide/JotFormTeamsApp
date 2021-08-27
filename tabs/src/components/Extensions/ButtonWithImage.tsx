import { Button, Flex } from "@fluentui/react-northstar";
import "../Components.css";

interface ButtonWithImageProps {
  /**
   * Icon to be shown on the top of the button.
   */
  icon: React.FC<any>;
  /**
   * Text to be shown on the button.
   */
  buttonText: string;
  /**
   * Callback to be called upon calling.
   */
  onClick: () => void;
}

export default function ButtonWithImage(props: ButtonWithImageProps) {
  const { icon: Icon, buttonText, onClick } = props;
  return (
    <Flex column gap="gap.medium" hAlign="center">
      <Flex
        fill
        className="flexIconFill"
        hAlign="center"
        vAlign="center"
        styles={{ width: "250px", height: "250px" }}
      >
        {<Icon style={{ color: "#fa8900" }} outline />}
      </Flex>
      <Button content={buttonText} onClick={onClick} fluid />
    </Flex>
  );
}
