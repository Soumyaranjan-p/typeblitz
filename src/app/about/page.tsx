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
    <main className="min-h-[calc(100dvh-64px)] bg-[radial-gradient(circle_at_50%_10%,rgba(0,229,255,0.14),transparent_28%),linear-gradient(135deg,#030408_0%,#0b0618_48%,#06172e_100%)] px-5 py-20 text-white lg:px-8">
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">
          Precision typing, quietly designed
        </p>
        <h1 className="max-w-3xl text-5xl font-bold tracking-wide md:text-7xl">
          Why Typeblitz?
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-300">
          Typeblitz is built for speed, accuracy, and distraction-free practice. It gives you a premium workspace for focused repetitions without turning the typing test into clutter.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/[0.055] p-7 shadow-[0_18px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.08] hover:shadow-[0_24px_90px_rgba(0,229,255,0.10)]"
            >
              <h2 className="text-xl font-bold tracking-wide">{feature.title}</h2>
              <p className="mt-4 text-sm font-medium leading-6 text-slate-400">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
