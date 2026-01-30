import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Palette, Mail, Lock, User, UserPlus, AlertCircle, CheckCircle } from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  // Email validation regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Name validation
  const isValidName = (name) => {
    return name.trim().length >= 2 && name.trim().length <= 50
  }

  // Strong password validation
  const isStrongPassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    const isLengthValid = password.length >= 8

    return {
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isLengthValid,
      isStrong: hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLengthValid
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    // Real-time validation
    const errors = { ...validationErrors }
    
    if (name === 'name') {
      if (!value.trim()) {
        errors.name = 'Name is required'
      } else if (!isValidName(value)) {
        errors.name = 'Name must be between 2 and 50 characters'
      } else {
        delete errors.name
      }
    } else if (name === 'email') {
      if (!value.trim()) {
        errors.email = 'Email is required'
      } else if (!isValidEmail(value)) {
        errors.email = 'Please enter a valid email address'
      } else {
        delete errors.email
      }
    } else if (name === 'password') {
      const strength = isStrongPassword(value)
      if (!value) {
        errors.password = 'Password is required'
      } else if (!strength.isStrong) {
        errors.password = 'Password must meet all requirements'
      } else {
        delete errors.password
      }
    }
    
    setValidationErrors(errors)
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    } else if (!isValidName(formData.name)) {
      errors.name = 'Name must be between 2 and 50 characters'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (!isStrongPassword(formData.password).isStrong) {
      errors.password = 'Password must meet all requirements'
    }
    
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }
    
    setLoading(true)

    try {
      await register(formData)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = isStrongPassword(formData.password)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Palette className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">
              PaletteFolio
            </span>
          </Link>
          <p className="text-gray-500 mt-2">Create your account to save themes.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition ${
                    validationErrors.name
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {validationErrors.name && (
                <div className="flex items-center gap-1 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4" />
                  {validationErrors.name}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition ${
                    validationErrors.email
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {validationErrors.email && (
                <div className="flex items-center gap-1 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4" />
                  {validationErrors.email}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition ${
                    validationErrors.password
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-medium text-gray-600">Password must contain:</p>
                  <div className="space-y-1 text-xs">
                    <div className={`flex items-center gap-2 ${passwordStrength.isLengthValid ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordStrength.isLengthValid ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      At least 8 characters
                    </div>
                    <div className={`flex items-center gap-2 ${passwordStrength.hasUpperCase ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordStrength.hasUpperCase ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      One uppercase letter (A-Z)
                    </div>
                    <div className={`flex items-center gap-2 ${passwordStrength.hasLowerCase ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordStrength.hasLowerCase ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      One lowercase letter (a-z)
                    </div>
                    <div className={`flex items-center gap-2 ${passwordStrength.hasNumbers ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordStrength.hasNumbers ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      One number (0-9)
                    </div>
                    <div className={`flex items-center gap-2 ${passwordStrength.hasSpecialChar ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordStrength.hasSpecialChar ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      One special character (!@#$%^&*...)
                    </div>
                  </div>
                </div>
              )}
              
              {validationErrors.password && (
                <div className="flex items-center gap-1 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4" />
                  {validationErrors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || Object.keys(validationErrors).length > 0 || !formData.name || !formData.email || !formData.password}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Creating account...'
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register