import { useEffect } from 'react'
import { Check, X, AlertCircle } from 'lucide-react'

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 2000)
    return () => clearTimeout(timer)
  }, [onClose])

  const styles = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-indigo-600'
  }

  const icons = {
    success: <Check className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className={`${styles[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
        {icons[type]}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  )
}

export default Toast
