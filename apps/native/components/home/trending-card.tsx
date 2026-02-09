import { Ionicons } from "@expo/vector-icons"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { mockTrendingTopics } from "@/lib/mock-data"
import { formatViewCount } from "@/lib/utils"

export function TrendingCard() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons color="#f59e0b" name="flash-outline" size={18} />
        <Text style={styles.headerText}>前沿洞察</Text>
        <View style={styles.spacer} />
        <Pressable>
          <Ionicons color="#ccc" name="close" size={18} />
        </Pressable>
      </View>

      {/* Items */}
      {mockTrendingTopics.map((item, index) => (
        <TrendingItem index={index + 1} key={item.id} title={item.title} views={item.views} />
      ))}

      {/* Footer */}
      <Pressable style={styles.footer}>
        <Text style={styles.footerText}>更多内容</Text>
        <Ionicons color="#999" name="chevron-forward" size={14} />
      </Pressable>
    </View>
  )
}

function TrendingItem({ index, title, views }: { index: number; title: string; views: number }) {
  const numberColor = index <= 3 ? "#ef4444" : "#999"

  return (
    <Pressable style={styles.item}>
      <Text style={[styles.itemNumber, { color: numberColor }]}>{index}</Text>
      <Text numberOfLines={1} style={styles.itemTitle}>
        {title}
      </Text>
      <Text style={styles.itemViews}>{formatViewCount(views)}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f5f5f5",
    backgroundColor: "#fafafa",
    padding: 16,
  },
  header: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#737373",
  },
  spacer: {
    flex: 1,
  },
  footer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 14,
    color: "#a3a3a3",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  itemNumber: {
    width: 24,
    fontSize: 16,
    fontWeight: "700",
  },
  itemTitle: {
    flex: 1,
    fontSize: 14,
    color: "#404040",
  },
  itemViews: {
    marginLeft: 12,
    fontSize: 12,
    color: "#a3a3a3",
  },
})
