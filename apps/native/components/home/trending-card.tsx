import { Ionicons } from "@expo/vector-icons"
import { Pressable, Text, View } from "react-native"
import { mockTrendingTopics } from "@/lib/mock-data"
import { formatViewCount } from "@/lib/utils"

export function TrendingCard() {
  return (
    <View className="mx-4 mt-2 rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
      {/* Header */}
      <View className="mb-3 flex-row items-center gap-2">
        <Ionicons color="#f59e0b" name="flash-outline" size={18} />
        <Text className="text-sm font-medium text-neutral-500">前沿洞察</Text>
        <View className="flex-1" />
        <Pressable>
          <Ionicons color="#ccc" name="close" size={18} />
        </Pressable>
      </View>

      {/* Items */}
      {mockTrendingTopics.map((item, index) => (
        <TrendingItem index={index + 1} key={item.id} title={item.title} views={item.views} />
      ))}

      {/* Footer */}
      <Pressable className="mt-3 flex-row items-center justify-center gap-1">
        <Text className="text-sm text-neutral-400">更多内容</Text>
        <Ionicons color="#999" name="chevron-forward" size={14} />
      </Pressable>
    </View>
  )
}

function TrendingItem({ index, title, views }: { index: number; title: string; views: number }) {
  const numberColor = index <= 3 ? "#ef4444" : "#999"

  return (
    <Pressable className="flex-row items-center py-2.5">
      <Text className="w-6 text-base font-bold" style={{ color: numberColor }}>
        {index}
      </Text>
      <Text className="flex-1 text-sm text-neutral-700" numberOfLines={1}>
        {title}
      </Text>
      <Text className="ml-3 text-xs text-neutral-400">{formatViewCount(views)}</Text>
    </Pressable>
  )
}
