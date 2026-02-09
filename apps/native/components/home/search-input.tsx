import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Pressable, StyleSheet, TextInput, View } from "react-native"

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
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TextInput
          onChangeText={setText}
          onSubmitEditing={handleSubmit}
          placeholder="有问题尽管问"
          placeholderTextColor="#999"
          returnKeyType="send"
          style={styles.input}
          value={text}
        />
        <Pressable onPress={handleSubmit}>
          <Ionicons color={text.trim() ? "#000" : "#ccc"} name="arrow-up-circle" size={28} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#fafafa",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#262626",
  },
})
