import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import logo from './login.png';
import './App.css';

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
      <div className="app">
        <nav className='navbar'>
          <Link to="/" className="title">Speedtester</Link>
          <div className='dropdown'>
            <img src= { logo } alt="Person Icon" className='person-icon' />
            <div className='dropdown-content'>
              <Link to="/login">Login</Link>
              <Link to="/register">Create Account</Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={(
              <div className="speedtest-container">
                <button className="start-button" onClick={runSpeedTest}>
                  <span className="start-text">Run Test!</span>  {/* Wrap text in span */}
                </button>
                {downloadSpeed && uploadSpeed && ping && (
                  <div className='results'>
                    <p>Download Speed: {downloadSpeed} Mbps</p>
                    <p>Upload Speed: {uploadSpeed} Mbps</p>
                    <p>Ping: {ping} ms</p>
                    {token ? (
                      <div>
                        <textarea
                          className='notes'
                          placeholder='Add notes'
                          value={notes}
                          onChange={e => setNotes(e.target.value)}
                        />
                        <button onClick={submitSpeedTest} className='submit-button'>Submit Speed Test</button>
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