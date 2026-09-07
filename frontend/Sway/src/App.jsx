import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login, { Mark } from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import "./App.css";
import PublicRoute from "./components/publicRoute";
import ProtectedRoute from "./components/protectedRoute";
import { AuthProvider } from "./context/AuthContext.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  const navigate = useNavigate();
  const goTo = (destination) => navigate(`/${destination}`);

  return (
    <main className="min-h-screen bg-[#f7f8f4] text-[#17201c] lg:grid lg:grid-cols-[minmax(340px,0.8fr)_minmax(560px,1.2fr)]">
      <aside className="relative hidden overflow-hidden bg-[#17201c] px-12 py-10 text-[#f7f8f4] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:self-start xl:px-20">
        <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full border-[34px] border-[#e4684c]/25" />
        <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border-[52px] border-[#d8e2d2]/10" />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#e4684c] text-lg font-black">
              s
            </div>
            <span className="font-display text-2xl font-semibold tracking-[-0.05em]">
              Sway
            </span>
          </div>
        </div>
        <div className="relative z-10 max-w-sm pb-8">
          <div className="mb-6 flex gap-1">
            <span className="h-1.5 w-10 rounded-full bg-[#e4684c]" />
            <span className="h-1.5 w-2 rounded-full bg-[#d8e2d2]/30" />
            <span className="h-1.5 w-2 rounded-full bg-[#d8e2d2]/30" />
          </div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#e4684c]">
            A softer social space
          </p>
          <h2 className="font-display text-5xl font-semibold leading-[1.05] tracking-[-0.05em] text-[#f7f8f4] xl:text-6xl">
            Stay close to what matters.
          </h2>
          <p className="mt-6 text-sm leading-7 text-[#b8c5bb]">
            Share the good stuff. Keep the noise down. Make room for the
            conversations worth having.
          </p>
        </div>
        <p className="relative z-10 text-xs text-[#829188]">
          Small thoughts. Real connections.
        </p>
      </aside>
      <section className="flex min-h-screen flex-col px-6 py-7 sm:px-10 lg:px-16 lg:py-10 xl:px-24">
        <header className="mb-12 flex items-center justify-between lg:mb-16">
          <div className="lg:hidden">
            <Mark />
          </div>
          <nav className="ml-auto flex items-center gap-1 rounded-2xl bg-[#e9eee7] p-1 text-xs font-bold text-[#66716a] sm:gap-2 sm:text-sm">
            <NavButton to="/home">Home</NavButton>
            <NavButton to="/login">Log in</NavButton>
            <NavButton to="/signup">Sign up</NavButton>
            <NavButton to="/logout">Log out</NavButton>
          </nav>
        </header>
        <div className="flex flex-1 items-start justify-center lg:items-center lg:pb-14">
          <AuthProvider>
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login onNavigate={goTo} />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup onNavigate={goTo} />
                  </PublicRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  <ProtectedRoute>
                    <Logout onNavigate={goTo} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home onNavigate={goTo} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/:username"
                element={
                  <ProtectedRoute>
                    <Profile onNavigate={goTo} />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </AuthProvider>
        </div>
        <footer className="mt-12 flex justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-[#9aa69d]">
          <span>Sway / 2026</span>
          <span>Built for better conversations and connections</span>
        </footer>
      </section>
    </main>
  );
}

function NavButton({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-xl px-3 py-2 transition-all sm:px-4 ${isActive ? "bg-[#f7f8f4] text-[#17201c] shadow-sm" : "hover:text-[#17201c]"}`
      }
    >
      {children}
    </NavLink>
  );
}

export default App;
