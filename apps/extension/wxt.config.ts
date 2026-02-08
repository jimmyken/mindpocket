import { defineConfig } from "wxt"

export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "MindPocket",
    description: "Save web pages to MindPocket",
    permissions: ["activeTab", "storage"],
    host_permissions: ["http://localhost:3000/*"],
  },
})
