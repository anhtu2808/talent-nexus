import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./ui/button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class GlobalError extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground text-center">
          <h1 className="text-4xl font-bold mb-4 text-destructive">Something went wrong</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-md">
            We're sorry, but an unexpected error occurred.
          </p>
          {this.state.error && (
            <pre className="bg-muted p-4 rounded-lg text-sm text-left overflow-auto max-w-2xl w-full mb-8 border border-border">
              {this.state.error.toString()}
            </pre>
          )}
          <Button onClick={() => window.location.reload()} variant="default" size="lg">
            Reload Application
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalError;
