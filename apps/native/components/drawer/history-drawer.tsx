import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import type { HistorySection } from "@/lib/chat-api"
import { HistoryList } from "./history-list"

const SCREEN_WIDTH = Dimensions.get("window").width
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8

interface HistoryDrawerProps {
  visible: boolean
  loading: boolean
  sections: HistorySection[]
  error?: string
  onDelete: (chatId: string) => void
  onClose: () => void
}

export function HistoryDrawer({
  visible,
  loading,
  sections,
  error,
  onDelete,
  onClose,
}: HistoryDrawerProps) {
  const insets = useSafeAreaInsets()
  const translateX = useSharedValue(-DRAWER_WIDTH)
  const [mounted, setMounted] = useState(visible)

  useEffect(() => {
    if (visible) {
      setMounted(true)
      translateX.value = withTiming(0, { duration: 300 })
      return
    }

    translateX.value = withTiming(-DRAWER_WIDTH, { duration: 300 }, (finished) => {
      if (finished) {
        runOnJS(setMounted)(false)
      }
    })
  }, [visible, translateX])

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-DRAWER_WIDTH, 0], [0, 0.5]),
  }))

  if (!mounted) {
    return null
  }

  return (
    <View style={styles.overlay}>
      {/* Backdrop */}
      <Animated.View
        pointerEvents={visible ? "auto" : "none"}
        style={[styles.backdrop, backdropStyle]}
      >
        <Pressable onPress={onClose} style={styles.backdropPress} />
      </Animated.View>

      {/* Drawer Panel */}
      <Animated.View style={[styles.drawer, { width: DRAWER_WIDTH }, drawerStyle]}>
        {/* Drawer Header */}
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <Text style={styles.headerTitle}>问答历史</Text>
          <Pressable onPress={onClose}>
            <Ionicons color="#999" name="close" size={22} />
          </Pressable>
        </View>

        {/* History List */}
        <HistoryList
          error={error}
          loading={loading}
          onDelete={onDelete}
          onItemPress={onClose}
          sections={sections}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#000",
  },
  backdropPress: {
    flex: 1,
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#262626",
  },
})
