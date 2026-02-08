import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { KeyboardAvoidingView, Platform, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ChatInputBar } from "@/components/chat/chat-input-bar"
import { ChatMessages } from "@/components/chat/chat-messages"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatScreen() {
  const { id: _id, initialMessage } = useLocalSearchParams<{
    id: string
    initialMessage?: string
  }>()
  const insets = useSafeAreaInsets()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")

  useEffect(() => {
    if (initialMessage) {
      setMessages([
        { id: "1", role: "user", content: initialMessage },
        {
          id: "2",
          role: "assistant",
          content: "这是一个模拟回复。实际实现时会调用 API 获取 AI 回答。",
        },
      ])
    }
  }, [initialMessage])

  const handleSend = () => {
    if (!inputText.trim()) {
      return
    }
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputText.trim(),
    }
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "这是模拟回复，后续会接入真实 API。",
    }
    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInputText("")
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
      keyboardVerticalOffset={90}
    >
      <ChatMessages messages={messages} />
      <View style={{ paddingBottom: insets.bottom }}>
        <ChatInputBar onChangeText={setInputText} onSend={handleSend} value={inputText} />
      </View>
    </KeyboardAvoidingView>
  )
}
