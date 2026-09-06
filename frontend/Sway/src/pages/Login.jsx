import { useState } from "react";
import axiosInstance from "../axiosCalls/axios";
import useAuth from "../context/useAuth";

function Login({ onNavigate }) {
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoginSuccess(false);
    setSubmitted(true);

    if (!isReady) {
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/users/login", form);
      setUser(response.data.User);
      console.log("User Logged in");
      setLoginSuccess(true);
      onNavigate("home");
    } catch (error) {
      setErr(
        error.response?.data?.message ||
          "Unable to log in. Check that the backend is running and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const emailIsValid = form.email.includes("@") && form.email.includes(".");
  const isReady = emailIsValid && form.password.length > 0;

  return (
    <div className="w-full max-w-[470px] animate-rise">
      <div className="mb-8 lg:hidden">
        <Mark />
      </div>
      <div className="mb-9">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#e4684c]">
          Welcome back
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] text-[#17201c] sm:text-5xl">
          Your people are here.
        </h1>
        <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#66716a]">
          Step back into the conversations, ideas, and tiny moments that make
          your corner of the internet feel like yours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={updateField}
          error={
            submitted && !emailIsValid ? "Enter a valid email address." : ""
          }
        />
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-[#26332d]"
            >
              Password
            </label>
            <button
              type="button"
              className="text-xs font-semibold text-[#e4684c] transition-colors hover:text-[#bc4e38]"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={updateField}
              className={`auth-input pr-12 ${submitted && !form.password ? "border-[#d85b46] ring-2 ring-[#d85b46]/10" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#819087] transition-colors hover:bg-[#eef3ed] hover:text-[#26332d]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {submitted && !form.password && (
            <p className="mt-2 text-xs font-medium text-[#d85b46]">
              Password is required.
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="primary-button mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            "Logging in..."
          ) : (
            <>
              Log in <span aria-hidden="true">&#8594;</span>
            </>
          )}
        </button>
        {err && (
          <p className="rounded-xl bg-[#fff0eb] px-4 py-3 text-center text-sm font-medium text-[#b84e3b]">
            {err}
          </p>
        )}
        {loginSuccess && (
          <p className="rounded-xl bg-[#eaf5e9] px-4 py-3 text-center text-sm font-medium text-[#397245]">
            Login successful.
          </p>
        )}
      </form>

      <p className="mt-8 text-center text-sm text-[#66716a]">
        New to the community?{" "}
        <button
          type="button"
          onClick={() => onNavigate("signup")}
          className="font-bold text-[#e4684c] hover:text-[#bc4e38]"
        >
          Create an account
        </button>
      </p>
    </div>
  );
}

function Field({ label, name, type, placeholder, value, onChange, error }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[#26332d]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`auth-input ${error ? "border-[#d85b46] ring-2 ring-[#d85b46]/10" : ""}`}
      />
      {error && (
        <p className="mt-2 text-xs font-medium text-[#d85b46]">{error}</p>
      )}
    </div>
  );
}

function Mark() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#e4684c] text-lg font-black text-white shadow-[0_8px_18px_rgba(228,104,76,0.22)]">
        s
      </div>
      <span className="font-display text-2xl font-semibold tracking-[-0.05em] text-[#17201c]">
        sway
      </span>
    </div>
  );
}

export { Mark };
export default Login;
