import { toggleTheme } from '../theme.js'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  return (
    <button
      className="btn-ghost"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {/* Light mode shows Moon; Dark mode shows Sun */}
      <Sun className="h-5 w-5 hidden dark:block" />
      <Moon className="h-5 w-5 dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
