import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class WebGLErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex items-center justify-center w-full h-full min-h-[200px] glass rounded-xl">
            <div className="text-center p-8 space-y-2">
              <div className="text-4xl mb-2">⚛️</div>
              <p className="text-foreground font-medium">3D visualization unavailable</p>
              <p className="text-muted-foreground text-sm">WebGL is not supported in this browser. Open in a modern browser to see 3D content.</p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
