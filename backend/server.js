const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

// Helper function to get file details from base64 string
function getFileDetails(base64String) {
  if (!base64String) {
    return { file_valid: false };
  }

  const [metaData, base64Data] = base64String.split(',');
  if (!metaData || !base64Data) {
    return { file_valid: false };
  }

  const mimeType = metaData.match(/data:(.*);base64/)[1];
  const fileSize = Math.round((base64Data.length * 3) / 4 / 1024); // Size in KB

  return {
    file_valid: true,
    file_mime_type: mimeType,
    file_size_kb: fileSize.toString()
  };
}

// Change route to /bfhl
app.post('/bfhl', (req, res) => {
  console.log('Received request body:', req.body); // Log the request body

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
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
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
