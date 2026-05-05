const FEATURES = [
  {
    title: "Real-time feedback",
    body: "Live pace, accuracy, and typing rhythm make every run easier to read and improve.",
  },
  {
    title: "Minimal distractions",
    body: "The interface keeps visual noise low, then focus mode clears the stage for the words.",
  },
  {
    title: "Performance analytics",
    body: "Useful stats stay close to the test so improvement feels immediate, not buried.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-24 text-[#e8e8e3] antialiased selection:bg-white/10 md:px-12 lg:px-24">
      <section className="mx-auto max-w-5xl">
        {/* Eyebrow */}
        <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#555550]">
          Precision typing, quietly designed
        </p>

        {/* Headline */}
        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-[#f5f5f0] md:text-7xl lg:text-8xl">
          Why Typeblitz?
        </h1>

        {/* Highlighted value proposition */}
        <div className="mt-10 max-w-xl border-l border-white/15 pl-6">
          <p className="text-lg font-medium leading-relaxed text-[#f5f5f0] md:text-xl">
            A premium workspace for focused repetitions. No clutter, no noise — just you and the words.
          </p>
        </div>

        {/* Supporting paragraph */}
        <p className="mt-8 max-w-xl text-base leading-7 text-[#73736e]">
          Typeblitz is built for speed, accuracy, and distraction-free practice. Every interaction is tuned to keep you in flow, from the first keystroke to the final stat.
        </p>

        {/* Subtle divider */}
        <div className="mt-20 h-px w-16 bg-white/10" />

        {/* Features */}
        <div className="mt-16 grid gap-14 md:grid-cols-3 md:gap-10">
          {FEATURES.map((feature, index) => (
            <article key={feature.title}>
              <span className="font-mono text-xs text-[#3a3a35]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-4 text-base font-semibold tracking-tight text-[#e8e8e3]">
                {feature.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#73736e]">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}