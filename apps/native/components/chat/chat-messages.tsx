import type { ChatStatus, UIMessage } from "ai"
import { useRef } from "react"
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import { ChatMessageBubble } from "./chat-message-bubble"

interface ChatMessagesProps {
  messages: UIMessage[]
  status: ChatStatus
  error?: Error | undefined
}

export function ChatMessages({ messages, status, error }: ChatMessagesProps) {
  const flatListRef = useRef<FlatList>(null)
  const isStreaming = status === "streaming" || status === "submitted"

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={messages}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<View style={styles.empty} />}
      ListFooterComponent={
        <>
          {isStreaming && messages.at(-1)?.role === "user" && (
            <View style={styles.loading}>
              <ActivityIndicator color="#737373" size="small" />
            </View>
          )}
          {error && (
            <View style={styles.errorBubble}>
              <Text style={styles.errorText}>出错了: {error.message}</Text>
            </View>
          )}
        </>
      }
      onContentSizeChange={() => {
        flatListRef.current?.scrollToEnd({ animated: true })
      }}
      ref={flatListRef}
      renderItem={({ item }) => <ChatMessageBubble message={item} />}
      style={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    paddingVertical: 16,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  loading: {
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  errorBubble: {
    marginBottom: 12,
    alignSelf: "flex-start",
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    backgroundColor: "#fef2f2",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  errorText: {
    fontSize: 14,
    color: "#ef4444",
  },
})
