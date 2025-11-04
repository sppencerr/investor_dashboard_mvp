import InvestorDashboardMock from './features/investor/InvestorDashboardMock'
import ThemeToggle from './components/ThemeToggle.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Simple header with theme toggle */}
      <header className="sticky top-0 z-10 border-b bg-[var(--bg)]/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Investor Dashboard</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Your existing dashboard UI */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <InvestorDashboardMock />
      </main>
    </div>
  )
}
