import { NavLink, useNavigate } from "react-router-dom";

import useAuth from "../../../context/useAuth";

import "./Sidebar.css";

const Sidebar = () => {
  const { logout, user } = useAuth();

  const navigate = useNavigate();

const handleLogout = () => {
  logout();

  navigate("/login", {
    replace: true,
  });
};

  return (
    <aside className="sidebar">
      {/* ==========================
          Logo
      ========================== */}

      <div className="sidebar-logo">
        <div className="logo-icon">✓</div>

        <div>
          <h2>TaskFlow</h2>
          <span>Task Manager</span>
        </div>
      </div>

      {/* ==========================
          Navigation
      ========================== */}

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          <span>🏠</span>

          <span>Dashboard</span>
        </NavLink>
      </nav>

      {/* ==========================
          Footer
      ========================== */}

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h4>{user?.name || "User"}</h4>

            <span>{user?.email}</span>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;