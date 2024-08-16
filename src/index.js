import React from 'react';
import ReactDOM from 'react-dom/client';

class WidgetChatbot extends React.Component {
  static init({ tenantId, container }) {
    const rootElement = document.getElementById(container);
    if (!rootElement) {
      console.error('Element not found');
      return;
    }

    const root = ReactDOM.createRoot(rootElement);
    root.render(<WidgetChatbot tenantId={tenantId} />);
  }

  render() {
    return <div>Hello, this is a widget for tenant: {this.props.tenantId}</div>;
  }
}

// Pastikan WidgetChatbot tersedia di window
window.WidgetChatbot = WidgetChatbot;
