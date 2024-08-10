export const APIKey = process.env.NEXT_PUBLIC_API_KEY;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const API_URL_CHATBOT = `${API_URL}/chatbot/rest/v1`;
export const API_URL_CONVERSATION = `${API_URL}/conversation/rest/v1`;
export const API_URL_PREVIEW_FILE = `${API_URL}/file/chatbot`;
export const API_URL_WEBSOCKET = `${API_URL}/websocket/ws`;
