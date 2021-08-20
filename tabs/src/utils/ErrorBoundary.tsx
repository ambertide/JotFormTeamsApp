import React, { ErrorInfo } from "react";

export default class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: { children: any }) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>An error has occurred.</h1>
          <p>You can find further information in the console log.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
