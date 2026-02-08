export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === "SAVE_PAGE") {
      handleSavePage().then(sendResponse)
      return true
    }
  })
})

async function handleSavePage() {
  try {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
    if (!tab?.id) {
      return { success: false, error: "No active tab" }
    }

    const response = await browser.tabs.sendMessage(tab.id, { type: "GET_PAGE_CONTENT" })
    if (!response?.html) {
      return { success: false, error: "Failed to get page content" }
    }

    const { saveBookmark } = await import("../lib/api")
    const result = await saveBookmark({
      url: response.url,
      html: response.html,
      title: response.title,
    })

    if (!result.ok) {
      return { success: false, error: result.data?.error || "Save failed" }
    }

    return { success: true, data: result.data }
  } catch (err) {
    return { success: false, error: String(err) }
  }
}
