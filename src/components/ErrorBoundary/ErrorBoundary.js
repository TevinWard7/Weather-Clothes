import React from 'react';
import { Button } from '@material-ui/core';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#d32f2f', marginBottom: '20px' }}>Oops! Something went wrong</h1>
          <p style={{ marginBottom: '20px', maxWidth: '500px' }}>
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            style={{ marginBottom: '10px' }}
          >
            Refresh Page
          </Button>
          <Button
            variant="outlined"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
