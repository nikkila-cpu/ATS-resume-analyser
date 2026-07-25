const express = require("express");
const cors = require("cors");

const resumeRoutes = require("./routes/resume");
const analyzeRoutes = require("./routes/analyze");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);
app.use("/api/analyze", analyzeRoutes);

app.get("/", (req, res) => {
  res.send("ATS Backend Running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});