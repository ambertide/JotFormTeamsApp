import { Avatar, Button, Flex } from "@fluentui/react-northstar";

interface ButtonWithImageProps {
  /**
   * Icon to be shown on the top of the button.
   */
  icon: JSX.Element;
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
  const { icon, buttonText, onClick } = props;
  return (
    <Flex column gap="gap.medium" hAlign="center">
      <Avatar icon={icon} size="largest" square />
      <Button content={buttonText} onClick={onClick} />
    </Flex>
  );
}
