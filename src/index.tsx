import React from 'react';
import ReactDOM from 'react-dom/client';
import WidgetClient from './components/widget';

interface WidgetChatbotProps {
  tenantId: string;
}

class WidgetChatbot extends React.Component<WidgetChatbotProps> {
  static init({ tenantId, container }: { tenantId: string; container: string }) {
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
(window as any).WidgetChatbot = WidgetChatbot;

export default WidgetChatbot;
