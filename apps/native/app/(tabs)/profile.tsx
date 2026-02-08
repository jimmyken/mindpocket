import { Ionicons } from "@expo/vector-icons"
import { Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()

  return (
    <View
      className="flex-1 items-center justify-center bg-white"
      style={{ paddingTop: insets.top }}
    >
      <Ionicons color="#999" name="person-outline" size={48} />
      <Text className="mt-4 text-lg font-semibold text-neutral-800">我</Text>
      <Text className="mt-2 text-sm text-neutral-400">即将推出</Text>
    </View>
  )
}
