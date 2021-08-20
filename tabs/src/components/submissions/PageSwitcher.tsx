import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  ContactCardIcon,
  PollIcon,
  TableIcon,
} from "@fluentui/react-northstar";
import { useMemo, useState, useEffect } from "react";

interface PageSwitcherProps {
  /**
   * Callback to be called on page number change.
   */
  onPageChange: (pageNumber: number) => void;
  /**
   * Indicates whether or not the page is currently loading.
   */
  isLoading: boolean;
  /**
   * Indicates if this is the last page.
   */
  isLastPage?: boolean;
}

/**
 * A group of buttons to switch the current page.
 */
export default function PageSwitcher({ onPageChange, isLastPage, isLoading }: PageSwitcherProps) {
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    onPageChange(currentPage); // Run the callback when the current page changes.
  }, [currentPage, onPageChange]);
  const buttons = useMemo(
    () => [
      {
        key: "previousPageButton",
        icon: <ArrowLeftIcon />,
        iconOnly: true,
        title: "Previous Page",
        onClick: () => setCurrentPage((prevPage) => prevPage - 1),
        disabled: currentPage <= 0 || isLoading,
      },
      {
        key: "nextPageButton",
        icon: <ArrowRightIcon />,
        iconOnly: true,
        title: "Next Page",
        onClick: () => setCurrentPage((prevPage) => prevPage + 1),
        disabled: isLastPage ? true : false || isLoading,
      },
    ],
    [setCurrentPage, isLastPage, currentPage, isLoading]
  );
  return <Button.Group buttons={buttons} />;
}
