import { useState } from "react";
import { FaUpload, FaFilePdf } from "react-icons/fa";
import { motion } from "framer-motion";

function ResumeUpload({ setResumeText }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setLoading(false);

      if (!data.success) {
        alert("Upload Failed");
        return;
      }

      setText(data.extractedText);
      setResumeText(data.extractedText);

      alert("Resume Uploaded Successfully");
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <motion.div
      className="card-custom"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="upload-title">
        <FaUpload color="#2563eb" /> Upload Resume
      </h2>

      <p style={{ color: "#6b7280" }}>
        Upload your PDF or DOCX resume for ATS analysis.
      </p>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            borderRadius: 12,
            background: "#eff6ff",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <FaFilePdf color="red" size={25} />

          <div>
            <strong>{file.name}</strong>

            <br />

            <small>
              {(file.size / 1024).toFixed(2)} KB
            </small>
          </div>
        </div>
      )}

      <button
        className="btn btn-primary btn-lg mt-4 w-100"
        onClick={uploadResume}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

      {text && (
        <>
          <hr />

          <h4>Extracted Resume Text</h4>

          <textarea
            value={text}
            readOnly
            rows={15}
          />
        </>
      )}
    </motion.div>
  );
}

export default ResumeUpload;