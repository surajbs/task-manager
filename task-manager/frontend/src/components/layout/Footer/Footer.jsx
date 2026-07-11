import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>
        © {new Date().getFullYear()} <strong>TaskFlow</strong> • Version 1.0.0
      </p>

      <p>
        Built with React, FastAPI & SQLAlchemy by <strong>Suraj BS</strong>
      </p>
    </footer>
  );
};

export default Footer;