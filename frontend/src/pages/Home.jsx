import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../api/axios"
import ThemeCard from "../components/ThemeCard"
import MockPortfolio from "../components/MockPortfolio"
import ColorSwatch from "../components/ColorSwatch"
import Toast from "../components/Toast"
import { useAuth } from "../context/AuthContext"
import { Palette, Layout, LogIn, UserPlus, LogOut, LayoutDashboard, Copy, Plus, Check } from 'lucide-react'

export default function Home() {
  const [themes, setThemes] = useState([])
  const [activeTheme, setActiveTheme] = useState(null)
  const [toast, setToast] = useState(null)
  const [cssCopied, setCssCopied] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  useEffect(() => {
    const fetchThemes = async () => {
      const res = await API.get("/themes")
      setThemes(res.data)
      setActiveTheme(res.data[0])
    }
    fetchThemes()
  }, [])

  const handleSaveTheme = async () => {
    if (!user) return
    try {
      await API.post("/themes/save", { themeId: activeTheme._id })
      showToast("Theme saved successfully!")
    } catch (err) {
      const message = err.response?.data?.message || "Failed to save theme"
      showToast(message, 'error')
    }
  }

  const handleCopyCSS = () => {
    if (!user) {
      showToast('Login to copy colors', 'error')
      return
    }
    const css = Object.entries(activeTheme.colors)
      .map(([k, v]) => `--color-${k}: ${v};`)
      .join('\n')
    navigator.clipboard.writeText(css)
    setCssCopied(true)
    setTimeout(() => setCssCopied(false), 2000)
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">
              PaletteFolio
            </h1>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Register</span>
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-500 hidden sm:block">
                  Hi, {user.name}
                </span>
                <Link
                  to="/create-theme"
                   className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Your Own color Palette</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar - Theme Selection */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Layout className="w-5 h-5" /> Choose a Vibe
              </h2>
              <div className="space-y-3">
                {themes.map((theme) => (
                  <ThemeCard
                    key={theme._id}
                    theme={theme}
                    active={activeTheme?._id === theme._id}
                    onClick={() => setActiveTheme(theme)}
                  />
                ))}
              </div>
            </div>

            {/* Current Palette Details */}
            {activeTheme && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-2">Current Palette</h2>
                <p className="text-sm text-gray-500 mb-6">
                  {user ? 'Click any color circle to copy the HEX code.' : 'Login to copy colors.'}
                </p>
                
                <div className="grid grid-cols-3 gap-4">
                  <ColorSwatch label="Background" color={activeTheme.colors.bg} canInteract={!!user} onLoginRequired={() => showToast('Login to copy colors', 'error')} />
                  <ColorSwatch label="Surface" color={activeTheme.colors.surface} canInteract={!!user} onLoginRequired={() => showToast('Login to copy colors', 'error')} />
                  <ColorSwatch label="Text" color={activeTheme.colors.text} canInteract={!!user} onLoginRequired={() => showToast('Login to copy colors', 'error')} />
                  <ColorSwatch label="Primary" color={activeTheme.colors.primary} canInteract={!!user} onLoginRequired={() => showToast('Login to copy colors', 'error')} />
                  <ColorSwatch label="Secondary" color={activeTheme.colors.secondary} canInteract={!!user} onLoginRequired={() => showToast('Login to copy colors', 'error')} />
                  <ColorSwatch label="Accent" color={activeTheme.colors.accent} canInteract={!!user} onLoginRequired={() => showToast('Login to copy colors', 'error')} />
                </div>

                {/* Copy All CSS Button */}
                <button
                  onClick={handleCopyCSS}
                  className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition text-sm font-medium ${
                    cssCopied 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cssCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied ✓
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy CSS
                    </>
                  )}
                </button>
                
              </div>
            )}
          </div>

          {/* Main - Preview */}
          <div className="lg:col-span-8">
            <div className="sticky top-24 space-y-4">
              {activeTheme && (
                <>
                  <div className="flex justify-between items-end mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">Live Preview</h2>
                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
                      Theme: {activeTheme.name}
                    </span>
                  </div>
                  
                  <MockPortfolio
                    theme={activeTheme}
                    canInteract={!!user}
                    onSave={handleSaveTheme}
                  />

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800 mt-6 flex gap-3 items-start">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Palette className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Why use a template?</p>
                      <p>Consistent color usage builds trust. Use the <strong>Primary</strong> color for your main buttons and links. Use the <strong>Secondary</strong> and <strong>Accent</strong> colors sparingly for hover states, highlights, or decorative elements to make your portfolio pop without looking cluttered.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Toast */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  )
}
