import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { ActivityIndicator, Pressable, SectionList, Text, View } from "react-native"
import type { HistorySection } from "@/lib/chat-api"

interface HistoryListProps {
  loading: boolean
  sections: HistorySection[]
  error?: string
  onDelete: (chatId: string) => void
  onItemPress?: () => void
}

export function HistoryList({ loading, sections, error, onDelete, onItemPress }: HistoryListProps) {
  const router = useRouter()

  const handlePress = (chatId: string) => {
    onItemPress?.()
    router.push({ pathname: "/chat/[id]", params: { id: chatId } })
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color="#737373" size="small" />
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-center text-sm text-red-500">{error}</Text>
      </View>
    )
  }

  return (
    <SectionList
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <View className="items-center py-10">
          <Text className="text-sm text-neutral-400">暂无历史对话</Text>
        </View>
      }
      ListFooterComponent={
        <View className="items-center py-6">
          <Text className="text-xs text-neutral-300">为你保留最近 90 天历史记录</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View className="flex-row items-center gap-3 px-4 py-3">
          <Pressable className="flex-1 flex-row items-center gap-3" onPress={() => handlePress(item.id)}>
            <Ionicons color="#666" name="chatbubble-outline" size={18} />
            <Text className="flex-1 text-sm text-neutral-700" numberOfLines={1}>
              {item.title}
            </Text>
          </Pressable>
          <Pressable className="rounded-md p-1" onPress={() => onDelete(item.id)}>
            <Ionicons color="#a3a3a3" name="trash-outline" size={16} />
          </Pressable>
        </View>
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
