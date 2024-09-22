const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Helper function to get file details from base64 string
function getFileDetails(base64String) {
  if (!base64String) {
    return { file_valid: false };
  }

  try {
    const [metaData, base64Data] = base64String.split(',');
    const mimeType = metaData.match(/data:(.*);base64/)[1];
    const fileSize = Math.round((base64Data.length * 3) / 4 / 1024); // Size in KB

    return {
      file_valid: true,
      file_mime_type: mimeType,
      file_size_kb: fileSize.toString()
    };
  } catch (error) {
    return { file_valid: false };
  }
}

app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: 'Invalid input data' });
  }

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const lowercaseAlphabets = alphabets.filter(char => char.toLowerCase() === char);
  const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

  const response = {
    is_success: true,
    user_id: "john_doe_17091999", // Replace with actual user_id logic
    email: "john@xyz.com", // Replace with actual email
    roll_number: "ABCD123", // Replace with actual roll number
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    ...getFileDetails(file_b64)
  };

  res.json(response);
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;