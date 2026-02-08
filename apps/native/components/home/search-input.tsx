import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Pressable, TextInput, View } from "react-native"

interface SearchInputProps {
  onSubmit: (text: string) => void
}

export function SearchInput({ onSubmit }: SearchInputProps) {
  const [text, setText] = useState("")

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim())
      setText("")
    }
  }

  return (
    <View className="mx-4 mb-3">
      <View className="flex-row items-center rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
        <TextInput
          className="flex-1 text-base text-neutral-800"
          onChangeText={setText}
          onSubmitEditing={handleSubmit}
          placeholder="有问题尽管问"
          placeholderTextColor="#999"
          returnKeyType="send"
          value={text}
        />
        <Pressable onPress={handleSubmit}>
          <Ionicons color={text.trim() ? "#000" : "#ccc"} name="arrow-up-circle" size={28} />
        </Pressable>
      </View>
    </View>
  )
}
