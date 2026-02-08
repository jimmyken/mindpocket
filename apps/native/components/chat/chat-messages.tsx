import { useRef } from "react"
import { FlatList, View } from "react-native"
import { ChatMessageBubble } from "./chat-message-bubble"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatMessagesProps {
  messages: Message[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const flatListRef = useRef<FlatList>(null)

  return (
    <FlatList
      className="flex-1 px-4"
      contentContainerStyle={{ paddingVertical: 16 }}
      data={messages}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<View className="flex-1 items-center justify-center pt-20" />}
      onContentSizeChange={() => {
        flatListRef.current?.scrollToEnd({ animated: true })
      }}
      ref={flatListRef}
      renderItem={({ item }) => <ChatMessageBubble content={item.content} role={item.role} />}
    />
  )
}
