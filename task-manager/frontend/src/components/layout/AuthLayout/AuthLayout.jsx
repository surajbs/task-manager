import "./AuthLayout.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      {/* ==========================
          Left Hero
      ========================== */}

      <section className="auth-hero">
        <div className="auth-brand">
          <div className="logo-circle">✓</div>

          <div>
            <h1>TaskFlow</h1>
            <span>Productivity Made Simple</span>
          </div>
        </div>

        <div className="hero-content">
          <h2>Organize your work.</h2>

          <h2>Track your progress.</h2>

          <h2>Achieve more.</h2>

          <p>
            A modern task management platform designed for
            professionals, teams and individuals who value
            focus, collaboration and productivity.
          </p>
        </div>

        {/* Floating Cards */}

        <div className="hero-illustration">

          <div className="floating-card card-one">
            <span>📌</span>

            <h4>12 Tasks Completed</h4>

            <p>
              Stay on top of your daily goals.
            </p>
          </div>

          <div className="floating-card card-two">
            <span>✅</span>

            <h4>Stay Focused</h4>

            <p>
              Build consistency every single day.
            </p>
          </div>

          <div className="floating-card card-three">
            <span>🚀</span>

            <h4>Productivity Increased</h4>

            <p>
              Organize better. Finish faster.
            </p>
          </div>

        </div>
      </section>

      {/* ==========================
          Right Form
      ========================== */}

      <section className="auth-form-section">
        <div className="auth-card">
          {children}
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;