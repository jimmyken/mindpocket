import { Ionicons } from "@expo/vector-icons"
import { Pressable, ScrollView, Text, View } from "react-native"
import { chatModels } from "@/lib/mock-data"

interface ToolbarProps {
  selectedModel: string
  onModelChange: (model: string) => void
}

export function Toolbar({ selectedModel, onModelChange: _onModelChange }: ToolbarProps) {
  const currentModel = chatModels.find((m) => m.id === selectedModel)

  return (
    <View className="mx-4 mb-4">
      <ScrollView
        contentContainerStyle={{ gap: 8 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {/* 对话模式 */}
        <ToolbarChip icon="chatbubble-outline" label="对话" />

        {/* 模型选择 */}
        <ToolbarChip icon="globe-outline" label={currentModel?.name ?? "GPT-4o Mini"} />

        {/* @提及 */}
        <ToolbarIconButton icon="at" />

        {/* 语音 */}
        <ToolbarIconButton icon="wifi-outline" />

        {/* 附件 */}
        <ToolbarIconButton icon="add" />
      </ScrollView>
    </View>
  )
}

function ToolbarChip({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <Pressable className="flex-row items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-1.5">
      <Ionicons color="#666" name={icon} size={16} />
      <Text className="text-sm text-neutral-600">{label}</Text>
      <Ionicons color="#999" name="chevron-down" size={12} />
    </Pressable>
  )
}

function ToolbarIconButton({ icon }: { icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <Pressable className="items-center justify-center rounded-full border border-neutral-200 bg-white px-2.5 py-1.5">
      <Ionicons color="#666" name={icon} size={18} />
    </Pressable>
  )
}
