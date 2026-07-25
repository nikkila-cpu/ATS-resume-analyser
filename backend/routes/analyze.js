const express = require("express");

const router = express.Router();

const skills = [
  "python",
  "java",
  "c",
  "c++",
  "javascript",
  "react",
  "node",
  "express",
  "mongodb",
  "mysql",
  "sql",
  "html",
  "css",
  "bootstrap",
  "git",
  "github",
  "docker",
  "aws",
  "django",
  "flask",
  "tensorflow",
  "pytorch",
  "pandas",
  "numpy",
  "machine learning",
  "deep learning",
  "artificial intelligence",
  "api",
  "linux",
  "dsa"
];

router.post("/", (req, res) => {

  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({
      success: false,
      message: "Resume text and Job Description are required"
    });
  }

  const resume = resumeText.toLowerCase();
  const jd = jobDescription.toLowerCase();

  const matched = [];
  const missing = [];

  skills.forEach(skill => {

    if (jd.includes(skill)) {

      if (resume.includes(skill)) {
        matched.push(skill);
      } else {
        missing.push(skill);
      }

    }

  });

  const total = matched.length + missing.length;

  const score =
    total === 0
      ? 0
      : Math.round((matched.length / total) * 100);

  const suggestions = [];

  if (score >= 90) {
    suggestions.push("Excellent resume match.");
  } else if (score >= 70) {
    suggestions.push("Good match. Add missing skills if applicable.");
  } else {
    suggestions.push("Resume needs improvement.");
  }

  missing.forEach(skill => {
    suggestions.push(`Consider adding ${skill}.`);
  });

  res.json({
    success: true,
    score,
    matched,
    missing,
    suggestions
  });

});

module.exports = router;