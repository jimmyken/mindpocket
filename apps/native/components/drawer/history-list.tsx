import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Pressable, SectionList, Text, View } from "react-native"
import { mockChatHistory } from "@/lib/mock-data"

interface HistoryListProps {
  onItemPress?: () => void
}

export function HistoryList({ onItemPress }: HistoryListProps) {
  const router = useRouter()

  const sections = mockChatHistory.map((group) => ({
    title: group.date,
    data: group.items,
  }))

  const handlePress = (chatId: string) => {
    onItemPress?.()
    router.push({ pathname: "/chat/[id]", params: { id: chatId } })
  }

  return (
    <SectionList
      keyExtractor={(item) => item.id}
      ListFooterComponent={
        <View className="items-center py-6">
          <Text className="text-xs text-neutral-300">为你保留最近 90 天历史记录</Text>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          className="flex-row items-center gap-3 px-4 py-3"
          onPress={() => handlePress(item.id)}
        >
          <Ionicons color="#666" name="chatbubble-outline" size={18} />
          <Text className="flex-1 text-sm text-neutral-700" numberOfLines={1}>
            {item.title}
          </Text>
        </Pressable>
      )}
      renderSectionHeader={({ section }) => (
        <View className="bg-white px-4 pb-1 pt-4">
          <Text className="text-xs text-neutral-400">{section.title}</Text>
        </View>
      )}
      sections={sections}
      stickySectionHeadersEnabled={false}
    />
  )
}
