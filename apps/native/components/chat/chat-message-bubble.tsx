import { Text, View } from "react-native"

interface ChatMessageBubbleProps {
  role: "user" | "assistant"
  content: string
}

export function ChatMessageBubble({ role, content }: ChatMessageBubbleProps) {
  const isUser = role === "user"

  return (
    <View className={`mb-3 max-w-[80%] ${isUser ? "self-end" : "self-start"}`}>
      <View
        className={`rounded-2xl px-4 py-3 ${
          isUser ? "rounded-br-sm bg-neutral-800" : "rounded-bl-sm bg-neutral-100"
        }`}
      >
        <Text className={`text-sm leading-5 ${isUser ? "text-white" : "text-neutral-700"}`}>
          {content}
        </Text>
      </View>
    </View>
  )
}
