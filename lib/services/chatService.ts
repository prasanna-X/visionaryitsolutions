import { supabaseAdmin } from "@/lib/supabase";
import type {
    ChatConversation,
    ChatConversationWithMessages,
    ChatMessage,
    ChatMessageRole,
} from "@/types/chat";

const CONVERSATIONS_TABLE = "chat_conversations";
const MESSAGES_TABLE = "chat_messages";

// Everything here uses supabaseAdmin (service role key) — visitors never
// talk to Supabase directly, only through the /api/chat route, which is
// the only place these functions should be called from besides the
// dashboard (admin-only, gated by the (protected) layout).

export async function createConversation(input: {
    visitorName?: string | null;
    visitorEmail?: string | null;
}): Promise<ChatConversation> {
    const { data, error } = await supabaseAdmin
        .from(CONVERSATIONS_TABLE)
        .insert({
            visitor_name: input.visitorName?.trim() || null,
            visitor_email: input.visitorEmail?.trim() || null,
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getConversationById(id: string): Promise<ChatConversation | null> {
    const { data, error } = await supabaseAdmin
        .from(CONVERSATIONS_TABLE)
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) throw error;
    return data;
}

export async function getMessagesForConversation(conversationId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabaseAdmin
        .from(MESSAGES_TABLE)
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

    if (error) throw error;
    return data ?? [];
}

export async function addMessage(
    conversationId: string,
    role: ChatMessageRole,
    content: string
): Promise<ChatMessage> {
    const { data, error } = await supabaseAdmin
        .from(MESSAGES_TABLE)
        .insert({ conversation_id: conversationId, role, content })
        .select()
        .single();

    if (error) throw error;

    // Bump last_message_at so the dashboard list sorts by recency. Best
    // effort — a failure here shouldn't break the chat reply.
    try {
        await supabaseAdmin
            .from(CONVERSATIONS_TABLE)
            .update({ last_message_at: data.created_at })
            .eq("id", conversationId);
    } catch (err) {
        console.error("Failed to bump conversation last_message_at:", err);
    }

    return data;
}

// Admin read — used by the dashboard.
export async function getAllConversationsAdmin(): Promise<ChatConversation[]> {
    const { data, error } = await supabaseAdmin
        .from(CONVERSATIONS_TABLE)
        .select("*")
        .order("last_message_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
}

export async function getConversationWithMessages(
    id: string
): Promise<ChatConversationWithMessages | null> {
    const conversation = await getConversationById(id);
    if (!conversation) return null;

    const messages = await getMessagesForConversation(id);
    return { ...conversation, messages };
}

export async function updateConversationStatus(
    id: string,
    status: "active" | "closed"
): Promise<ChatConversation> {
    const { data, error } = await supabaseAdmin
        .from(CONVERSATIONS_TABLE)
        .update({ status })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteConversation(id: string): Promise<void> {
    const { error } = await supabaseAdmin.from(CONVERSATIONS_TABLE).delete().eq("id", id);
    if (error) throw error;
}
