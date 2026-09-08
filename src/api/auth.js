

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/auth";

const extractErrorMessage = function (data) {
  if (data.detail) return data.detail;
  const firstKey = Object.keys(data)[0];
  if (firstKey && Array.isArray(data[firstKey])) return data[firstKey][0];
  return "Something went wrong";
};

export const registerRequest = async function (name, email, password) {
  const [firstName, ...rest] = name.trim().split(" ");
  const lastName = rest.join(" ");

  const response = await fetch(`${API_BASE}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      password2: password,
      first_name: firstName,
      last_name: lastName,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(extractErrorMessage(data));
  }

  return data;
};

export const loginRequest = async function (email, password) {
  const response = await fetch(`${API_BASE}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(extractErrorMessage(data));
  }

  return data;
};