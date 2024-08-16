import React from 'react';
import ReactDOM from 'react-dom/client';
import WidgetClient from './components/widget';

// Definisikan tipe untuk props di WidgetChatbot
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
    return <div>Hello, this is a widget for tenant: {this.props.tenantId}</div>;
  }
}

// Attach ke window secara manual
declare global {
  interface Window {
    WidgetChatbot: typeof WidgetChatbot;
  }
}

window.WidgetChatbot = WidgetChatbot;

export default WidgetChatbot;
