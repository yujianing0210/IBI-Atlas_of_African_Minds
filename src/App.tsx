import QuoteOracle from './components/QuoteOracle'

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03050b] px-4 py-4 text-white sm:px-6">
      <main className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl items-center justify-center">
        <QuoteOracle />
      </main>
    </div>
  )
}

export default App
