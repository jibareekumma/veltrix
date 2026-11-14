import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthShell from "../components/auth/AuthShell";
import PasswordField from "../components/auth/PasswordField";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const Register = function () {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = async function (event) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(name.trim(), email, password);
      showToast("Account created. Welcome to Veltrix.");
      navigate("/home");
    } catch (submitError) {
      setError(submitError.message);
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join VELTRIX and step into performance"
      footer={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    >
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__field">
          <label className="auth__label" htmlFor="fullName">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            value={name}
            onChange={function (event) {
              setName(event.target.value);
            }}
            className="auth__input"
            required
          />
        </div>

        <div className="auth__field">
          <label className="auth__label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={function (event) {
              setEmail(event.target.value);
            }}
            className="auth__input"
            required
          />
        </div>

        <PasswordField
          id="password"
          label="Password"
          placeholder="At least 6 characters"
          autoComplete="new-password"
          value={password}
          onChange={function (event) {
            setPassword(event.target.value);
          }}
        />

        <PasswordField
          id="confirmPassword"
          label="Confirm password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={function (event) {
            setConfirmPassword(event.target.value);
          }}
        />

        {error && (
          <p className="auth__error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn--primary btn--block" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </AuthShell>
  );
};

export default Register;
