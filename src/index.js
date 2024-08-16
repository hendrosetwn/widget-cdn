import React from 'react';
import ReactDOM from 'react-dom/client';

class WidgetChatbot {
  static init({ tenantId, elementId }) {
    const container = document.getElementById(elementId);
    if (!container) {
      console.error('Element not found');
      return;
    }

    const root = ReactDOM.createRoot(container);

    root.render(<WidgetChatbot tenantId={tenantId} />);
  }
}

window.WidgetChatbot = WidgetChatbot;
