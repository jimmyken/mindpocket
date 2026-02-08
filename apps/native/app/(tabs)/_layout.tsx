import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: "#e5e5e5",
          backgroundColor: "#fff",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "MindPocket",
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="sparkles" size={size} />,
        }}
      />
      <Tabs.Screen
        name="knowledge"
        options={{
          title: "知识库",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="library-outline" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: "笔记",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="document-text-outline" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "我",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="person-outline" size={size} />
          ),
        }}
      />
    </Tabs>
  )
}
