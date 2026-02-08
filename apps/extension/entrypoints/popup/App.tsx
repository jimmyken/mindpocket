import { useEffect, useState } from "react"
import { getSession, signIn } from "../../lib/api"
import "./App.css"

type User = { id: string; name: string; email: string }
type Status = "idle" | "loading" | "success" | "error"

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    getSession().then((res) => {
      if (res.ok && res.data?.user) {
        setUser(res.data.user)
      }
      setChecking(false)
    })
  }, [])

  if (checking) {
    return (
      <div className="app">
        <p className="status">检查登录状态...</p>
      </div>
    )
  }

  if (!user) {
    return <LoginForm onLogin={setUser} />
  }

  return <SavePage user={user} onLogout={() => setUser(null)} />
}

function LoginForm({ onLogin }: { onLogin: (user: User) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setError("")

    const res = await signIn(email, password)
    if (res.ok && res.data?.user) {
      setStatus("success")
      onLogin(res.data.user)
    } else {
      setStatus("error")
      setError("登录失败，请检查邮箱和密码")
    }
  }

  return (
    <div className="app">
      <h1 style={{ fontSize: 16, fontWeight: 600 }}>MindPocket</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "登录中..." : "登录"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

function SavePage({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  const handleSave = async () => {
    setStatus("loading")
    setMessage("")

    const res = await browser.runtime.sendMessage({ type: "SAVE_PAGE" })
    if (res?.success) {
      setStatus("success")
      setMessage(`已保存: ${res.data?.title || "页面"}`)
    } else {
      setStatus("error")
      setMessage(res?.error || "保存失败")
    }
  }

  return (
    <div className="app">
      <div className="header">
        <h1>MindPocket</h1>
        <button className="logout-btn" onClick={onLogout} type="button">
          退出
        </button>
      </div>
      <p className="user-info">{user.email}</p>
      <button
        className="btn btn-save"
        onClick={handleSave}
        disabled={status === "loading"}
        type="button"
      >
        {status === "loading" ? "保存中..." : "收藏此页面"}
      </button>
      {status === "success" && <p className="success">{message}</p>}
      {status === "error" && <p className="error">{message}</p>}
    </div>
  )
}

export default App
