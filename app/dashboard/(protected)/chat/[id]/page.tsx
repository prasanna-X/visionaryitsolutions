// "/dashboard/chat/[id]"
import { notFound } from "next/navigation";
import { getConversationWithMessages } from "@/lib/services/chatService";
import ChatConversationView from "@/components/dashboard/chat/ChatConversationView";

export default async function DashboardChatConversationPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const conversation = await getConversationWithMessages(id);
    if (!conversation) notFound();

    return <ChatConversationView conversation={conversation} />;
}
