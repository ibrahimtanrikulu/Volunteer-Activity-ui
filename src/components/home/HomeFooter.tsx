export function HomeFooter() {
  return (
    <footer className="rounded-3xl border border-gray-100 bg-white p-8 text-sm text-gray-500 shadow-inner shadow-gray-100">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
            Impact Collective
          </p>
          <p className="font-medium text-gray-900">
            Gönüllülüğün yeni nesil deneyimi.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-gray-500">
          <span>Manifesto</span>
          <span>Partnerler</span>
          <span>Blog</span>
          <span>İletişim</span>
        </div>
        <p className="text-gray-400">
          © {new Date().getFullYear()} Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
