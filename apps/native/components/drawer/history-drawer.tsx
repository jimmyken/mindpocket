import { Ionicons } from "@expo/vector-icons"
import { useEffect } from "react"
import { Dimensions, Pressable, Text, View } from "react-native"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { HistoryList } from "./history-list"

const SCREEN_WIDTH = Dimensions.get("window").width
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8

interface HistoryDrawerProps {
  visible: boolean
  onClose: () => void
}

export function HistoryDrawer({ visible, onClose }: HistoryDrawerProps) {
  const insets = useSafeAreaInsets()
  const translateX = useSharedValue(-DRAWER_WIDTH)

  useEffect(() => {
    translateX.value = withTiming(visible ? 0 : -DRAWER_WIDTH, {
      duration: 300,
    })
  }, [visible, translateX])

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-DRAWER_WIDTH, 0], [0, 0.5]),
    pointerEvents: visible ? ("auto" as const) : ("none" as const),
  }))

  if (!visible && translateX.value === -DRAWER_WIDTH) {
    return null
  }

  return (
    <View className="absolute inset-0" style={{ zIndex: 100 }}>
      {/* Backdrop */}
      <Animated.View className="absolute inset-0 bg-black" style={backdropStyle}>
        <Pressable className="flex-1" onPress={onClose} />
      </Animated.View>

      {/* Drawer Panel */}
      <Animated.View
        className="absolute bottom-0 left-0 top-0 bg-white"
        style={[{ width: DRAWER_WIDTH }, drawerStyle]}
      >
        {/* Drawer Header */}
        <View
          className="flex-row items-center justify-between border-b border-neutral-100 px-4 pb-3"
          style={{ paddingTop: insets.top + 12 }}
        >
          <Text className="text-lg font-bold text-neutral-800">问答历史</Text>
          <Pressable onPress={onClose}>
            <Ionicons color="#999" name="close" size={22} />
          </Pressable>
        </View>

        {/* History List */}
        <HistoryList onItemPress={onClose} />
      </Animated.View>
    </View>
  )
}
