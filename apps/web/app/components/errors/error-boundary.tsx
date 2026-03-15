'use client';

import { Component, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('UI Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-sm text-red-500">Something went wrong.</div>
      );
    }

    return this.props.children;
  }
}
