import { useState } from "react";
import { Mark } from "./Login";
import axiosInstance from "../../../axiosCalls/axios";

const initialForm = {
  name: "",
  username: "",
  email: "",
  password: "",
  phone_no: "",
  bio: "",
  profile_Image: "",
};

function Signup({ onNavigate }) {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err,setErr] = useState("")
  const [loading,setLoading] = useState(false)


  // same as handle change 
  const updateField = (event) =>
    setForm((prev) => ({...prev, [event.target.name]: event.target.value }));   

  const requiredReady =
    form.name.trim() &&
    form.username.trim() &&
    form.email.includes("@") &&
    form.password.length > 6;

  //Clicking on the signup 
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try{
      await axiosInstance.post('/users/register',form)
      console.log("User registered")
    }catch(error){
     console.log(error)
    }
    // console.log("Form submitted")
  };

  

  return (
    <div className="w-full max-w-[580px] animate-rise">
      <div className="mb-8 lg:hidden">
        <Mark />
      </div>
      <div className="mb-7">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#e4684c]">
          Make an entrance
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] text-[#17201c] sm:text-5xl">
          Find your people.
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-[#66716a]">
          A good feed starts with a good hello. Set up your profile and bring
          your perspective along.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Full name"
            name="name"      //key and value each data has a name property set 
            placeholder="Avery Morgan"
            value={form.name}
            onChange={updateField}
            error={
              submitted && !form.name.trim() ? "Your name is required." : ""
            }
          />
          <Field
            label="Username"
            name="username"
            placeholder="averymorgan"
            value={form.username}
            onChange={updateField}     //handlechange field 
            error={
              submitted && !form.username.trim() ? "Choose a username." : ""
            }
          />
        </div>
        <Field
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={updateField}
          error={
            submitted && !form.email.includes("@")
              ? "Enter a valid email address."
              : ""
          }
        />
        <div>
          <label
            htmlFor="signup-password"
            className="mb-2 block text-sm font-semibold text-[#26332d]"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 7 characters"
              value={form.password}
              onChange={updateField}
              className={`auth-input pr-12 ${submitted && form.password.length <= 6 ? "border-[#d85b46] ring-2 ring-[#d85b46]/10" : ""}`}
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
          {submitted && form.password.length <= 6 && (
            <p className="mt-2 text-xs font-medium text-[#d85b46]">
              Use more than 6 characters.
            </p>
          )}
        </div>
        <div className="border-t border-[#e4e9e1] pt-5">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#819087]">
            Optional profile details
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Phone number"
              name="phone_no"
              type="tel"
              placeholder="+1 555 000 0000"
              value={form.phone_no}
              onChange={updateField}
            />
            <Field
              label="Profile image URL"
              name="profile_Image"
              type="url"
              placeholder="https://..."
              value={form.profile_Image}
              onChange={updateField}
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="bio"
              className="mb-2 block text-sm font-semibold text-[#26332d]"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="3"
              maxLength="160"
              placeholder="A few words about you"
              value={form.bio}
              onChange={updateField}
              className="auth-input resize-none"
            />
          </div>
        </div>
        <label className="flex items-start gap-3 text-xs leading-5 text-[#66716a]">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 accent-[#e4684c]"
          />
          I agree to keep this space kind, curious, and useful.
        </label>
        <button type="submit" className="primary-button w-full" onChange={handleSubmit}>
          Create account <span aria-hidden="true">&#8594;</span>
        </button>
        {submitted && requiredReady && (
          <p className="rounded-xl bg-[#eaf5e9] px-4 py-3 text-center text-sm font-medium text-[#397245]">
            Your profile is ready to connect when you are.
          </p>
        )}
      </form>
      <p className="mt-7 text-center text-sm text-[#66716a]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => onNavigate("login")}
          className="font-bold text-[#e4684c] hover:text-[#bc4e38]"
        >
          Log in
        </button>
      </p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) {
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

export default Signup;
