import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "../styles/pages/Account.scss";

const formatDate = function (value) {
  if (!value) {
    return "Recently";
  }
  return new Date(value).toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const Account = function () {
  const { user, displayName, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async function () {
    await logout();
    showToast("You have been signed out.", "info");
    navigate("/home");
  };

  return (
    <main className="account">
      <div className="account__card">
        <span className="account__avatar">{displayName.charAt(0).toUpperCase()}</span>
        <h1 className="account__name">{displayName}</h1>
        <p className="account__email">{user.email}</p>

        <dl className="account__details">
          <div>
            <dt>Member since</dt>
            <dd>{formatDate(user.created_at)}</dd>
          </div>
          <div>
            <dt>Account type</dt>
            <dd>Member</dd>
          </div>
        </dl>

        <button type="button" className="btn btn--dark btn--block" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </main>
  );
};

export default Account;
