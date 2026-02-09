import { Ionicons } from "@expo/vector-icons"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { chatModels } from "@/lib/mock-data"

interface ToolbarProps {
  selectedModel: string
  onModelChange: (model: string) => void
}

export function Toolbar({ selectedModel, onModelChange: _onModelChange }: ToolbarProps) {
  const currentModel = chatModels.find((m) => m.id === selectedModel)

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <ToolbarChip icon="chatbubble-outline" label="对话" />
        <ToolbarChip icon="globe-outline" label={currentModel?.name ?? "GPT-4o Mini"} />
        <ToolbarIconButton icon="at" />
        <ToolbarIconButton icon="wifi-outline" />
        <ToolbarIconButton icon="add" />
      </ScrollView>
    </View>
  )
}

function ToolbarChip({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <Pressable style={styles.chip}>
      <Ionicons color="#666" name={icon} size={16} />
      <Text style={styles.chipText}>{label}</Text>
      <Ionicons color="#999" name="chevron-down" size={12} />
    </Pressable>
  )
}

function ToolbarIconButton({ icon }: { icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <Pressable style={styles.iconButton}>
      <Ionicons color="#666" name={icon} size={18} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  scrollContent: {
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: {
    fontSize: 14,
    color: "#525252",
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
})
