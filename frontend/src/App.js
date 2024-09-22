import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);
    setSelectedOptions([]);

    try {
      const parsedInput = JSON.parse(input);
      const result = await axios.post('/api/bfhl', parsedInput);
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON input or API error');
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions(prevOptions =>
      prevOptions.includes(option)
        ? prevOptions.filter(item => item !== option)
        : [...prevOptions, option]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes('alphabets') && (
          <div className="response-section">
            <h3>Alphabets:</h3>
            <p>{response.alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('numbers') && (
          <div className="response-section">
            <h3>Numbers:</h3>
            <p>{response.numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('highest') && (
          <div className="response-section">
            <h3>Highest lowercase alphabet:</h3>
            <p>{response.highest_lowercase_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <h1>RA2111026030194</h1> {/* Replace with your actual roll number */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input'
          rows={5}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div className="response">
          <h2>Select options to display:</h2>
          <div className="filter-options">
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('alphabets')}
                onChange={() => handleOptionChange('alphabets')}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('numbers')}
                onChange={() => handleOptionChange('numbers')}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes('highest')}
                onChange={() => handleOptionChange('highest')}
              />
              Highest lowercase alphabet
            </label>
          </div>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;