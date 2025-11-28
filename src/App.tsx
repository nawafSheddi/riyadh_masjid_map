function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold text-center">خريطة مساجد الرياض</h1>
      </header>
      <main className="p-4">
        <p className="text-center text-foreground-muted">
          جاري تحميل الخريطة...
        </p>
      </main>
    </div>
  )
}

export default App
