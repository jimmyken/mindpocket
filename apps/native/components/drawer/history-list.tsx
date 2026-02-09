import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { ActivityIndicator, Pressable, SectionList, StyleSheet, Text, View } from "react-native"
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
      <View style={styles.center}>
        <ActivityIndicator color="#737373" size="small" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.errorCenter}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    <SectionList
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>暂无历史对话</Text>
        </View>
      }
      ListFooterComponent={
        <View style={styles.footer}>
          <Text style={styles.footerText}>为你保留最近 90 天历史记录</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Pressable onPress={() => handlePress(item.id)} style={styles.rowContent}>
            <Ionicons color="#666" name="chatbubble-outline" size={18} />
            <Text numberOfLines={1} style={styles.rowTitle}>
              {item.title}
            </Text>
          </Pressable>
          <Pressable onPress={() => onDelete(item.id)} style={styles.deleteButton}>
            <Ionicons color="#a3a3a3" name="trash-outline" size={16} />
          </Pressable>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
        </View>
      )}
      sections={sections}
      stickySectionHeadersEnabled={false}
    />
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  errorText: {
    textAlign: "center",
    fontSize: 14,
    color: "#ef4444",
  },
  empty: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: "#a3a3a3",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    color: "#d4d4d4",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowTitle: {
    flex: 1,
    fontSize: 14,
    color: "#404040",
  },
  deleteButton: {
    borderRadius: 6,
    padding: 4,
  },
  sectionHeader: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 4,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    color: "#a3a3a3",
  },
})
