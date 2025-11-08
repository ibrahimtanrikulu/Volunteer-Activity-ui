export function HeroSection() {
  const highlightPills = [
    "Kurumsal Programlar",
    "Hafta Sonu Görevleri",
    "Uzaktan Katılım",
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 p-10 text-white shadow-2xl">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_55%)]" />
      <div className="relative z-10 max-w-xl space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-white/70">
          Etki Alanını Büyüt
        </p>
        <h2 className="text-4xl font-semibold leading-tight">
          Türkiye’nin dört bir yanındaki gönüllü etkinliklerine katıl, ilham
          veren topluluklarla tanış.
        </h2>
        <p className="text-lg text-white/90">
          Akıllı filtreler ve seçkin partner kuruluşlarla ihtiyacına uygun
          fırsatlar tek bir panelde toplandı.
        </p>
        <div className="flex flex-wrap gap-3">
          {highlightPills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-white/40 px-4 py-1 text-sm text-white/80"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
