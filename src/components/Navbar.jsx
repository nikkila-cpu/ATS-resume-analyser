import { FaFileAlt } from "react-icons/fa";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(90deg,#2563eb,#1d4ed8)",
        padding: "15px 0",
      }}
    >
      <div className="container">

        <a
          className="navbar-brand fw-bold fs-3 d-flex align-items-center"
          href="/"
        >
          <FaFileAlt
            size={35}
            style={{
              marginRight: "12px",
            }}
          />

          ATS Resume Analyzer
        </a>

        <div className="text-white text-end">

          <div
            style={{
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            AI Powered Resume Scanner
          </div>

          <small
            style={{
              opacity: 0.9,
            }}
          >
            Optimize your resume for every job
          </small>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;