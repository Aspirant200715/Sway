import { useState } from "react";

function Signup({ onSwitch, onDemoSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="auth-logo">Instagram</div>
      <p className="auth-tagline">
        Sign up to see photos and moments from your friends.
      </p>
      <button type="button" className="social-login">
        <i className="bi bi-facebook" /> Sign up with Facebook
      </button>
      <div className="divider">
        <span>OR</span>
      </div>
      <form onSubmit={onDemoSubmit} className="auth-form">
        <label className="field">
          <span>Mobile number or email</span>
          <input type="text" placeholder="Mobile number or email" required />
          <i className="bi bi-at" />
        </label>
        <label className="field">
          <span>Full name</span>
          <input type="text" placeholder="Full name" required />
          <i className="bi bi-person" />
        </label>
        <label className="field">
          <span>Username</span>
          <input type="text" placeholder="Username" required />
          <i className="bi bi-person-badge" />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            minLength="8"
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
        <p className="terms">
          People who use our service may have uploaded your contact information
          to circles.{" "}
          <button type="button" className="text-button">
            Learn more
          </button>
        </p>
        <button className="submit-button" type="submit">
          Sign up <i className="bi bi-arrow-right" />
        </button>
      </form>
      <div className="switch-card">
        Have an account?{" "}
        <button type="button" onClick={onSwitch}>
          Log in
        </button>
      </div>
    </>
  );
}

export default Signup;
