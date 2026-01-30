import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'
import MockPortfolio from '../components/MockPortfolio'
import Toast from '../components/Toast'
import { Palette, ArrowLeft, Save, Sparkles, Copy, Check } from 'lucide-react'

const defaultColors = {
  bg: '#0f172a',
  surface: '#1e293b',
  primary: '#38bdf8',
  secondary: '#f472b6',
  accent: '#facc15',
  text: '#f1f5f9',
  subtext: '#94a3b8'
}

const colorLabels = {
  bg: 'Background',
  surface: 'Surface',
  primary: 'Primary',
  secondary: 'Secondary',
  accent: 'Accent',
  text: 'Text',
  subtext: 'Subtext'
}

const CreateTheme = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [colors, setColors] = useState(defaultColors)
  const [saving, setSaving] = useState(false)
  const [cssCopied, setCssCopied] = useState(false)
  const [toast, setToast] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  const handleColorChange = (key, value) => {
    setColors(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    if (!name.trim()) {
      showToast('Please give your theme a name!', 'error')
      return
    }

    setSaving(true)
    try {
      await API.post('/themes/custom', {
        name: name.trim(),
        description: description.trim() || `Custom theme by ${user.name}`,
        colors
      })
      showToast('Theme created successfully!')
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create theme', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleCopyCSS = () => {
    const css = Object.entries(colors)
      .map(([k, v]) => `--color-${k}: ${v};`)
      .join('\n')
    navigator.clipboard.writeText(css)
    setCssCopied(true)
    setTimeout(() => setCssCopied(false), 2000)
  }

  const previewTheme = {
    name: name || 'My Custom Theme',
    description: description || 'Preview your color combination',
    colors
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <Palette className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">
                Create Theme
              </h1>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !name.trim()}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Theme'}
          </button>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel - Color Picker */}
          <div className="lg:col-span-4 space-y-6">
            {/* Theme Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Theme Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Ocean Breeze"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your color palette..."
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Color Pickers */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-indigo-600" />
                Pick Your Colors
              </h2>
              
              <div className="space-y-4">
                {Object.entries(colors).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-indigo-400 transition"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        {colorLabels[key]}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-full mt-1 px-3 py-2 text-sm font-mono border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CSS Output */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">CSS Variables</h2>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
{Object.entries(colors).map(([k, v]) => `--color-${k}: ${v};`).join('\n')}
              </pre>
              <button
                onClick={handleCopyCSS}
                className={`w-full mt-4 py-2 rounded-lg transition text-sm font-medium flex items-center justify-center gap-2 ${
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
          </div>

          {/* Right Panel - Live Preview */}
          <div className="lg:col-span-8">
            <div className="sticky top-24 space-y-4">
              <div className="flex justify-between items-end mb-2">
                <h2 className="text-lg font-semibold text-gray-800">Live Preview</h2>
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
                  {name || 'Untitled Theme'}
                </span>
              </div>
              
              <MockPortfolio
                theme={previewTheme}
                canInteract={true}
                onSave={handleSave}
              />
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

export default CreateTheme
