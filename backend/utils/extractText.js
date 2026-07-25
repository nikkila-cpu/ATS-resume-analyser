const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

async function extractText(filePath) {
  if (filePath.endsWith(".pdf")) {
    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);
    return data.text;
  }

  if (filePath.endsWith(".docx")) {
    const result = await mammoth.extractRawText({
      path: filePath,
    });

    return result.value;
  }

  return "";
}

module.exports = extractText;