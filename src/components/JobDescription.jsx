import { FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";

function JobDescription({ jobDescription, setJobDescription }) {
  return (
    <motion.div
      className="card-custom"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="jd-title">
        <FaBriefcase color="#2563eb" /> Job Description
      </h2>

      <p style={{ color: "#6b7280" }}>
        Paste the complete Job Description below.
      </p>

      <textarea
        rows={15}
        placeholder="Paste the Job Description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <div
        style={{
          marginTop: 15,
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        Characters: {jobDescription.length}
      </div>
    </motion.div>
  );
}

export default JobDescription;