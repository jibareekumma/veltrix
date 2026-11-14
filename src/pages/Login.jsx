import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthShell from "../components/auth/AuthShell";
import PasswordField from "../components/auth/PasswordField";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const notices = {
  checkout: "Log in or create an account to check out.",
  "members-only": "That area is for members. Log in to continue.",
};

const Login = function () {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login: loginUser, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const redirectTo = (location.state && location.state.from) || "/home";
  const notice = location.state ? notices[location.state.reason] : null;

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async function (event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await loginUser(email, password);
      showToast("Welcome back.");
      navigate(redirectTo, { replace: true });
    } catch (submitError) {
      setError(submitError.message);
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to continue with VELTRIX"
      notice={notice}
      footer={
        <>
          Don't have an account? <Link to="/register">Sign up</Link>
        </>
      }
    >
      <form className="auth__form" onSubmit={handleSubmit}>
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
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={function (event) {
            setPassword(event.target.value);
          }}
        />

        {error && (
          <p className="auth__error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn--primary btn--block" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </AuthShell>
  );
};

export default Login;
