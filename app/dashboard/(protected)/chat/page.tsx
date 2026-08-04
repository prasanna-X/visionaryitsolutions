// "/dashboard/chat"
import { getAllConversationsAdmin } from "@/lib/services/chatService";
import ChatConversationTable from "@/components/dashboard/chat/ChatConversationTable";

export default async function DashboardChatPage() {
    const conversations = await getAllConversationsAdmin();
    return <ChatConversationTable conversations={conversations} />;
}
