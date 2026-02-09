import { Ionicons } from "@expo/vector-icons"
import { Pressable, StyleSheet, TextInput, View } from "react-native"

interface ChatInputBarProps {
  value: string
  onChangeText: (text: string) => void
  onSend: () => void
  isStreaming?: boolean
  onStop?: () => void
}

export function ChatInputBar({
  value,
  onChangeText,
  onSend,
  isStreaming,
  onStop,
}: ChatInputBarProps) {
  const isEmpty = !value.trim()

  return (
    <View style={styles.container}>
      <TextInput
        editable={!isStreaming}
        multiline
        onChangeText={onChangeText}
        onSubmitEditing={onSend}
        placeholder={isStreaming ? "AI 正在回复..." : "输入消息..."}
        placeholderTextColor="#999"
        style={styles.input}
        value={value}
      />
      {isStreaming ? (
        <Pressable onPress={onStop} style={styles.stopButton}>
          <Ionicons color="#fff" name="stop" size={18} />
        </Pressable>
      ) : (
        <Pressable
          disabled={isEmpty}
          onPress={onSend}
          style={[styles.sendButton, isEmpty ? styles.sendButtonDisabled : styles.sendButtonActive]}
        >
          <Ionicons color="#fff" name="arrow-up" size={18} />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    maxHeight: 96,
    minHeight: 36,
    borderRadius: 16,
    backgroundColor: "#fafafa",
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: "#262626",
  },
  stopButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    backgroundColor: "#ef4444",
    padding: 8,
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    padding: 8,
  },
  sendButtonDisabled: {
    backgroundColor: "#d4d4d4",
  },
  sendButtonActive: {
    backgroundColor: "#262626",
  },
})
