import { useState } from "react";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

function App() {
  const [mode, setMode] = useState("login");
  const [notice, setNotice] = useState("");
  const isLogin = mode === "login";

  function handleDemoSubmit(event) {
    event.preventDefault();
    setNotice(
      isLogin
        ? "Demo login ready. Connect your login API here."
        : "Demo signup ready. Connect your signup API here.",
    );
  }

  function switchMode() {
    setMode(isLogin ? "signup" : "login");
    setNotice("");
  }

  return (
    <main className="auth-page">
      <div className="grain" />
      <section className="container auth-shell">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="story-panel">
              <div className="brand-mark">
                <span className="brand-dot" />
                circles
              </div>
              <div className="story-copy">
                <p className="eyebrow">A quieter kind of social</p>
                <h1>Make room for the moments that matter.</h1>
                <p className="story-description">
                  A little corner of the internet for your people, your ideas,
                  and everything in between.
                </p>
              </div>
              <div className="photo-stack">
                <div className="photo photo-back" />
                <div className="photo photo-main" />
                <div className="floating-note">
                  <span className="note-icon">
                    <i className="bi bi-stars" />
                  </span>
                  <span>
                    <strong>Good energy only</strong>
                    <small>from your circle</small>
                  </span>
                </div>
              </div>
              <div className="story-footer">
                <span>01 / 03</span>
                <div className="progress-line">
                  <span />
                </div>
                <span>discover</span>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-side">
              <div className="auth-card">
                {isLogin ? (
                  <Login
                    onSwitch={switchMode}
                    onDemoSubmit={handleDemoSubmit}
                  />
                ) : (
                  <Signup
                    onSwitch={switchMode}
                    onDemoSubmit={handleDemoSubmit}
                  />
                )}
                {notice && (
                  <div className="demo-notice" role="status">
                    <i className="bi bi-check2-circle" />
                    {notice}
                  </div>
                )}
              </div>
              <div className="app-links">
                <span>Get the app.</span>
                <button type="button" aria-label="Download on the App Store">
                  <i className="bi bi-apple" />
                </button>
                <button type="button" aria-label="Get it on Google Play">
                  <i className="bi bi-google-play" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
