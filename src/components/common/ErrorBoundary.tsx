import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonClass } from "@/components/ui";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary caught an error]:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger-soft text-danger">
            <AlertTriangle className="h-8 w-8" aria-hidden="true" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-semibold text-ink sm:text-3xl">
            An unexpected error occurred
          </h2>
          <p className="mt-2.5 max-w-md text-sm text-ink-body leading-relaxed">
            We apologize for the inconvenience. Our engineering team has been notified. You can try refreshing the page or navigating back to safety.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className={buttonClass("primary", "md")}
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Refresh Page
            </button>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false, error: null })}
              className={buttonClass("secondary", "md")}
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Return Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
