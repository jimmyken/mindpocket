export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    browser.runtime.onMessage.addListener((message) => {
      if (message.type === "GET_PAGE_CONTENT") {
        return Promise.resolve({
          url: window.location.href,
          title: document.title,
          html: document.documentElement.outerHTML,
        })
      }
    })
  },
})
