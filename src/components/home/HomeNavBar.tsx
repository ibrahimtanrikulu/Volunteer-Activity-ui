import { Link } from "react-router-dom";

export function HomeNavBar() {
  return (
    <nav className="flex items-center justify-between rounded-2xl border border-white/50 bg-white/90 px-8 py-5 shadow-xl shadow-emerald-100 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-emerald-500/10 p-2 text-emerald-600">
          <span className="text-xl">✦</span>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
            Volunteer Hub
          </p>
          <h1 className="text-xl font-semibold text-gray-900">
            Impact Collective
          </h1>
        </div>
      </div>
      <div className="hidden items-center gap-6 text-sm font-medium text-gray-500 md:flex">
        <Link to="/" className="transition hover:text-gray-900">
          Etkinlikler
        </Link>
        <button className="transition hover:text-gray-900">Programlar</button>
        <Link to="/organizations" className="transition hover:text-gray-900">
          Topluluklar
        </Link>
        <button className="transition hover:text-gray-900">Kaynaklar</button>
      </div>
      <div className="flex items-center gap-4">
        <Link
          to="/organizer"
          className="hidden text-sm font-semibold text-gray-500 transition hover:text-gray-900 md:block"
        >
          Organizatör Paneli
        </Link>
        <Link
          to="/login"
          className="text-sm font-semibold text-gray-500 transition hover:text-gray-900"
        >
          Giriş Yap
        </Link>
        <Link
          to="/register"
          className="rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-500"
        >
          Gönüllü Ol
        </Link>
      </div>
    </nav>
  );
}
