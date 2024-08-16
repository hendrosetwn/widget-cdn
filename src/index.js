import React from 'react';
import ReactDOM from 'react-dom/client';
import WidgetClient from './components/widget';

class WidgetChatbot extends React.Component {
  static init({ tenantId, container }) {
    const rootElement = document.getElementById(container);
    if (!rootElement) {
      console.error('Element not found');
      return;
    }

    const root = ReactDOM.createRoot(rootElement);
    root.render(<WidgetClient tenantId={tenantId} />);
  }

  render() {
    return <WidgetClient tenantId={this.props.tenantId} />;
  }
}

// Attach to the window object manually
window.WidgetChatbot = WidgetChatbot;

export default WidgetChatbot;
