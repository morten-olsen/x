import { Component } from 'react';
import { DefaultError } from './defult-error';

type State = {
  hasError: boolean;
  error?: string;
  actions?: {
    label: string;
    fn: () => void;
  }[];
};

type Props = {
  children: React.ReactNode;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(err: any) {
    let message = 'Unknown error';
    if (err instanceof Error) {
      message = err.message;
    }
    if (typeof err === 'string') {
      message = err;
    }
    return { hasError: true, error: message };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <DefaultError message={this.state.error ?? 'Unknown error'} />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
