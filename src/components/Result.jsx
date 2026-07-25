import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaLightbulb,
  FaRobot,
  FaDownload,
} from "react-icons/fa";
import jsPDF from "jspdf";

function Result({ resumeText, jobDescription, result, setResult }) {
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    const response = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumeText,
        jobDescription,
      }),
    });

    const data = await response.json();
    setResult(data);
  };

  const analyzeAI = async () => {
    setLoading(true);

    const response = await fetch("http://localhost:5000/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumeText,
        jobDescription,
      }),
    });

    const data = await response.json();

    setAiResult(data.answer);

    setLoading(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("ATS Resume Report", 20, 20);

    doc.setFontSize(14);
    doc.text(`ATS Score : ${result.score}%`, 20, 40);

    doc.text("Matched Skills", 20, 60);

    let y = 70;

    result.matched.forEach((item) => {
      doc.text("- " + item, 25, y);
      y += 8;
    });

    y += 10;

    doc.text("Missing Skills", 20, y);

    y += 10;

    result.missing.forEach((item) => {
      doc.text("- " + item, 25, y);
      y += 8;
    });

    doc.save("ATS_Report.pdf");
  };

  return (
    <div className="card-custom mt-4">

      <div className="d-flex gap-3 justify-content-center">

        <button
          className="btn btn-success"
          onClick={analyzeResume}
        >
          Analyze ATS
        </button>

        <button
          className="btn btn-dark"
          onClick={analyzeAI}
        >
          <FaRobot /> {loading ? "Analyzing..." : "Analyze with AI"}
        </button>

      </div>

      {result && (
        <>
          <div
            style={{
              width: 180,
              margin: "30px auto",
            }}
          >
            <CircularProgressbar
              value={result.score}
              text={`${result.score}%`}
            />
          </div>

          <h3>Matched Skills</h3>

          {result.matched.map((item, index) => (
            <span
              key={index}
              className="badge bg-success m-2 p-2"
            >
              <FaCheckCircle /> {item}
            </span>
          ))}

          <hr />

          <h3>Missing Skills</h3>

          {result.missing.map((item, index) => (
            <span
              key={index}
              className="badge bg-danger m-2 p-2"
            >
              <FaTimesCircle /> {item}
            </span>
          ))}

          <hr />

          <button
            className="btn btn-primary"
            onClick={downloadPDF}
          >
            <FaDownload /> Download PDF
          </button>
        </>
      )}

      {aiResult && (
        <>
          <hr />

          <h2>
            <FaLightbulb color="orange" /> AI Suggestions
          </h2>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#f8f9fa",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            {aiResult}
          </pre>
        </>
      )}

    </div>
  );
}

export default Result;