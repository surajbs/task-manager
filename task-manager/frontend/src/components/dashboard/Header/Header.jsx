import "./Header.css";

import useAuth from "../../../context/useAuth";

const Header = () => {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>
          Welcome back, {user?.name || "User"} 👋
        </h1>

        <p>{today}</p>
      </div>

      <div className="header-right">
        <button
          className="header-avatar"
          type="button"
          aria-label="User menu"
        >
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </button>
      </div>
    </header>
  );
};

export default Header;