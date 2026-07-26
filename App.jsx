import Navbar from "./components/Navbar";
import ResumeUpload from "./components/ResumeUpload";
import JobDescription from "./components/JobDescription";
import Result from "./components/Result";
import "./App.css";
import { useState } from "react";
import { FaRobot, FaSearch, FaChartLine } from "react-icons/fa";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  return (
    <>
      <Navbar />

      <div className="container py-5">

        {/* Hero Section */}

        <div
          className="card-custom text-center mb-5"
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#4f46e5)",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "700",
            }}
          >
            ATS Resume Analyzer
          </h1>

          <p
            style={{
              fontSize: "20px",
              marginTop: "15px",
              opacity: "0.95",
            }}
          >
            Upload your resume, compare it with any Job Description,
            and improve your ATS score instantly.
          </p>

          <div className="row mt-5">

            <div className="col-md-4">

              <FaRobot
                size={50}
                color="white"
              />

              <h4 className="mt-3">
                AI Powered
              </h4>

              <p>
                Smart Resume Analysis
              </p>

            </div>

            <div className="col-md-4">

              <FaSearch
                size={50}
                color="white"
              />

              <h4 className="mt-3">
                Keyword Matching
              </h4>

              <p>
                Detect Missing Skills
              </p>

            </div>

            <div className="col-md-4">

              <FaChartLine
                size={50}
                color="white"
              />

              <h4 className="mt-3">
                ATS Score
              </h4>

              <p>
                Improve Resume Ranking
              </p>

            </div>

          </div>

        </div>

        {/* Upload Resume */}

        <ResumeUpload
          setResumeText={setResumeText}
        />

        {/* Job Description */}

        <JobDescription
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
        />

        {/* Result */}

        <Result
          resumeText={resumeText}
          jobDescription={jobDescription}
          result={result}
          setResult={setResult}
        />

      </div>
    </>
  );
}

export default App;