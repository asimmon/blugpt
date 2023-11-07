import { Message } from "ai";

export const CHAT_DOCUMENT_ATTRIBUTE = "CHAT_DOCUMENT";
export const CHAT_THREAD_ATTRIBUTE = "CHAT_THREAD";
export const MESSAGE_ATTRIBUTE = "CHAT_MESSAGE";

export interface ChatMessageModel {
  id: string;
  createdAt: Date;
  isDeleted: boolean;
  threadId: string;
  userId: string;
  content: string;
  role: ChatRole;
  context: string;
  type: "CHAT_MESSAGE";
}

export type ConversationStyle = "creative" | "balanced" | "precise";
export type ChatType = "simple" | "data" | "mssql";

export type ChatRole = "system" | "user" | "assistant" | "function";
export type ChatModel = "gpt-3.5" | "gpt-4";

export const CHAT_MODEL_NAMES: Record<ChatModel, string> = {
  "gpt-3.5": "gpt-3.5-turbo-1106",
  "gpt-4": "gpt-4-1106-preview",
};

export interface ChatThreadModel {
  id: string;
  name: string;
  createdAt: Date;
  userId: string;
  useName: string;
  isDeleted: boolean;
  chatType: ChatType;
  chatModel: ChatModel;
  conversationStyle: ConversationStyle;
  chatOverFileName: string;
  type: "CHAT_THREAD";
}

export interface PromptGPTBody {
  id: string; // thread id
  chatType: ChatType;
  conversationStyle: ConversationStyle;
  chatOverFileName: string;
  chatModel: ChatModel;
}

export interface PromptGPTProps extends PromptGPTBody {
  messages: Message[];
}

export interface ChatDocumentModel {
  id: string;
  name: string;
  chatThreadId: string;
  userId: string;
  isDeleted: boolean;
  createdAt: Date;
  type: "CHAT_DOCUMENT";
}

export interface ServerActionResponse<T> {
  success: boolean;
  error: string;
  response: T;
}
