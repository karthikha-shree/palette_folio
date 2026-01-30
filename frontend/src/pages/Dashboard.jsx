import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'
import Toast from '../components/Toast'
import { Palette, Trash2, Copy, Check, ArrowLeft, Bookmark, Plus } from 'lucide-react'

const Dashboard = () => {
  const [savedThemes, setSavedThemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [copiedColor, setCopiedColor] = useState(null)
  const [copiedCSS, setCopiedCSS] = useState(null)
  const [toast, setToast] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const { user } = useAuth()

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  useEffect(() => {
    fetchSavedThemes()
  }, [])

  const fetchSavedThemes = async () => {
    try {
      const res = await API.get('/themes/saved')
      setSavedThemes(res.data)
    } catch (err) {
      console.error('Failed to fetch saved themes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (themeId) => {
    try {
      await API.delete(`/themes/saved/${themeId}`)
      setSavedThemes(savedThemes.filter(t => t.theme._id !== themeId))
      setConfirmDelete(null)
      showToast('Theme removed successfully')
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete', 'error')
      setConfirmDelete(null)
    }
  }

  const copyColor = (color, label) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(`${label}-${color}`)
    setTimeout(() => setCopiedColor(null), 1500)
  }

  const copyCSS = (theme) => {
    const css = Object.entries(theme.colors)
      .map(([k, v]) => `--color-${k}: ${v};`)
      .join('\n')
    navigator.clipboard.writeText(css)
    setCopiedCSS(theme._id)
    setTimeout(() => setCopiedCSS(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <Palette className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">
                PaletteFolio
              </h1>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Welcome, <span className="font-medium text-gray-700">{user?.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-indigo-600" />
              Saved Themes
            </h2>
            <p className="text-gray-500 mt-1">Your collection of saved color palettes</p>
          </div>
          <Link
                  to="/create-theme"
                   className="bg-blue-500 flex items-center gap-2 text-white hover:bg-blue-600 font-medium transition px-4 py-2 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Your Own color Palette</span>
                </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading your themes...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && savedThemes.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No saved themes yet</h3>
            <p className="text-gray-500 mb-6">Browse themes and save your favorites!</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              <Palette className="w-5 h-5" />
              Browse Themes
            </Link>
          </div>
        )}

        {/* Saved Themes Grid */}
        {!loading && savedThemes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedThemes.map(({ theme }) => (
              <div
                key={theme._id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {/* Theme Preview Header */}
                <div
                  className="h-24 relative"
                  style={{ backgroundColor: theme.colors.bg }}
                >
                  <div className="absolute inset-0 flex items-center justify-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full shadow-lg"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div
                      className="w-10 h-10 rounded-full shadow-lg"
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                    <div
                      className="w-8 h-8 rounded-full shadow-lg"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>
                </div>

                {/* Theme Info */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{theme.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{theme.description}</p>

                  {/* Color Swatches */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(theme.colors).slice(0, 6).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => copyColor(value, key)}
                        className="group flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition"
                        title={`Copy ${value}`}
                      >
                        <div
                          className="w-8 h-8 rounded-full border border-gray-200 shadow-sm relative"
                          style={{ backgroundColor: value }}
                        >
                          {copiedColor === `${key}-${value}` && (
                            <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow" />
                          )}
                        </div>
                        <span className="text-xs text-gray-400 mt-1 capitalize">{key}</span>
                      </button>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => copyCSS(theme)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition text-sm font-medium ${
                        copiedCSS === theme._id
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {copiedCSS === theme._id ? (
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
                    {confirmDelete === theme._id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDelete(theme._id)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(theme._id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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

export default Dashboard