import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold text-indigo-600">
          Gönüllü Platform
        </Link>

        {/* Menü */}
        <div className="flex items-center space-x-6 text-sm font-medium">
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `hover:text-indigo-600 transition ${
                isActive ? "text-indigo-600" : "text-gray-700"
              }`
            }
          >
            Etkinlikler
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `hover:text-indigo-600 transition ${
                isActive ? "text-indigo-600" : "text-gray-700"
              }`
            }
          >
            Giriş
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `hover:text-indigo-600 transition ${
                isActive ? "text-indigo-600" : "text-gray-700"
              }`
            }
          >
            Kayıt Ol
          </NavLink>
        </div>
      </nav>
    </header>
  );
}