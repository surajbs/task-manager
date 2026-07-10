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
        <h1>Welcome back, {user?.name || "User"} 👋</h1>

        <p>{today}</p>
      </div>

      <div className="header-right">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tasks..."
          />
        </div>

        <button className="icon-button">
          🔔
        </button>

        <div className="header-avatar">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
};

export default Header;