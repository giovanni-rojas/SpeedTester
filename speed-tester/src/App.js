import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Rout, Switch, Link, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [ token, setToken ] = useState(localStorage.getItem('token'));
  const [ downloadSpeed, setDownloadSpeed ] = useState(null);
  const [ uploadSpeed, setUploadSpeed ] = useState(null);
  const [ notes, setNotes ] = useState('');
  
  //TODO: Replace with logic here
  const runSpeedTest = () => {
    setDownloadSpeed(Math.random() * 100);
    setUploadSpeed(Math.random() * 100);
  };

  const submitSpeedTest = async () => {
    try {
      await axios.post('/speedtest', {
        download_speed: downloadSpeed,
        upload_speed: uploadSpeed,
        notes,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Speed test submitted successfully!');
    }
    catch (err) {
      alert('Failed to submit speed test');
    }
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
        <Switch>
          <Route path="/" exact>
            <div>
                <h1>Run Speed Test</h1>
                <button onClick={runSpeedTest}> Run Test</button>
                {downloadSpeed && uploadSpeed (
                  <div>
                    <p>Download Speed: {downloadSpeed} Mbps</p>
                    <p>Upload Speed: {uploadSpeed} Mbps</p>
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
          </Route>
          {/* Add routes for login and register */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
