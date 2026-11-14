import { useState } from "react";

const PasswordField = function ({ id, label, placeholder, value, onChange, autoComplete }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="auth__field">
      <label className="auth__label" htmlFor={id}>
        {label}
      </label>
      <div className="auth__input-wrapper">
        <input
          id={id}
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className="auth__input"
          minLength={6}
          required
        />
        <button
          type="button"
          className="auth__toggle"
          onClick={function () {
            setIsVisible(function (prevState) {
              return !prevState;
            });
          }}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
            <circle cx="12" cy="12" r="3" />
            {isVisible && <path d="M3 3l18 18" />}
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
