export type ChatConversationStatus = "active" | "closed";

export type ChatMessageRole = "user" | "assistant";

export interface ChatConversation {
    id: string;
    visitor_name: string | null;
    visitor_email: string | null;
    status: ChatConversationStatus;
    created_at: string;
    last_message_at: string;
}

export interface ChatMessage {
    id: string;
    conversation_id: string;
    role: ChatMessageRole;
    content: string;
    created_at: string;
}

export interface ChatConversationWithMessages extends ChatConversation {
    messages: ChatMessage[];
}

// Body accepted by POST /api/chat
export interface ChatSendInput {
    conversationId?: string | null;
    message: string;
    visitorName?: string | null;
    visitorEmail?: string | null;
}
