import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [ token, setToken ] = useState(localStorage.getItem('token'));
  const [ downloadSpeed, setDownloadSpeed ] = useState(null);
  const [ uploadSpeed, setUploadSpeed ] = useState(null);
  const [ ping, setPing ] = useState('');
  const [ notes, setNotes ] = useState('');
  
  const runSpeedTest = async () => {
    try {
      const response = await axios.get('http://localhost:5000/run-speedtest');
      const { download_speed, upload_speed, ping } = response.data;
      setDownloadSpeed(download_speed);
      setUploadSpeed(upload_speed)
      setPing(ping);
    }
    catch (error) {
      console.error('Error running speed test:', error);
      alert('Failed to run speed test')
    }
  };

  const submitSpeedTest = async () => {
    try {
      await axios.post('http://localhost:5000/speedtest', {
        download_speed: downloadSpeed,
        upload_speed: uploadSpeed,
        notes,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Speed test submitted succesfully!');
    } catch (err) {
      alert('Failed to submit speed test');
    }
  }

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
        <Routes>
          <Route path="/" element={(
              <div>
                <h1>Run Speed Test</h1>
                <button onClick={runSpeedTest}>Run Test</button>
                {downloadSpeed && uploadSpeed && ping && (
                  <div>
                    <p>Download Speed: {downloadSpeed} Mbps</p>
                    <p>Upload Speed: {uploadSpeed} Mbps</p>
                    <p>Ping: {ping} ms</p>
                    {token ? (
                      <div>
                        <textarea
                          placeholder='Add notes'
                          value={notes}
                          onChange={e => setNotes(e.target.value)}
                        />
                        <button onClick={submitSpeedTest}>Submit Speed Test</button>
                      </div>
                    ) : (
                      <p>Login to save test results</p>
                    )}
                  </div>
                )}
              </div>
            )} />
            {/* Add routes for login and register */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;