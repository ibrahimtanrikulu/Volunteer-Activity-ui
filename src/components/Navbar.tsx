import { Link, NavLink } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
  const { user, logout } = useAuth();

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

          {user ? (
            <>
              {/* Org rolü ise etkinlik oluştur */}
              {user.role === "org" && (
                <NavLink
                  to="/events/new"
                  className={({ isActive }) =>
                    `hover:text-indigo-600 transition ${
                      isActive ? "text-indigo-600" : "text-gray-700"
                    }`
                  }
                >
                  Etkinlik Oluştur
                </NavLink>
              )}

              <NavLink
                to="/my-events"
                className={({ isActive }) =>
                  `hover:text-indigo-600 transition ${
                    isActive ? "text-indigo-600" : "text-gray-700"
                  }`
                }
              >
                Etkinliklerim
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `hover:text-indigo-600 transition ${
                    isActive ? "text-indigo-600" : "text-gray-700"
                  }`
                }
              >
                Profil
              </NavLink>

              <button
                onClick={logout}
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Çıkış
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
}