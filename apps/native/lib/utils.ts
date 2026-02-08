export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) {
    return "早上好"
  }
  if (hour >= 12 && hour < 18) {
    return "下午好"
  }
  if (hour >= 18 && hour < 23) {
    return "晚上好"
  }
  return "夜深了"
}

export function formatViewCount(count: number): string {
  if (count >= 10_000) {
    return `${(count / 10_000).toFixed(1)}万`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}
