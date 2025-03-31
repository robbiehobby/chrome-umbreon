import json from "./locales/en/messages.json";

interface Messages {
  [key: string]: { message: string };
}
const messages = json as Messages;

export default function getMessage(key: string, substitutions?: string | string[]): string {
  try {
    return chrome.i18n.getMessage(key, substitutions);
  } catch (_error) {
    if (messages[key].message) return messages[key].message;
    return "";
  }
}
