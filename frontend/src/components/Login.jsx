import { useState } from "react";

function Login({ onSwitch, onDemoSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="auth-logo">Instagram</div>
      <p className="auth-tagline">Share photos and videos with your friends.</p>
      <form onSubmit={onDemoSubmit} className="auth-form">
        <label className="field">
          <span>Phone number, username, or email</span>
          <input
            type="text"
            placeholder="Phone number, username, or email"
            required
          />
          <i className="bi bi-person" />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
          />
          <button
            className="field-action"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
          </button>
        </label>
        <button className="submit-button" type="submit">
          Log in <i className="bi bi-arrow-right" />
        </button>
      </form>
      <div className="divider">
        <span>OR</span>
      </div>
      <button type="button" className="social-login">
        <i className="bi bi-facebook" /> Log in with Facebook
      </button>
      <button type="button" className="forgot-button">
        Forgot password?
      </button>
      <div className="switch-card">
        Don't have an account?{" "}
        <button type="button" onClick={onSwitch}>
          Sign up
        </button>
      </div>
    </>
  );
}

export default Login;
