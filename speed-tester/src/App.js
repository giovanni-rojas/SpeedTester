import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import logo from './login.png';
import './App.css';

function App() {
  const [ token, setToken ] = useState(localStorage.getItem('token'));
  const [ downloadSpeed, setDownloadSpeed ] = useState(null);
  const [ uploadSpeed, setUploadSpeed ] = useState(null);
  const [ ping, setPing ] = useState(null);
  const [ notes, setNotes ] = useState('');
  const [ testProgress, setTestProgress ] = useState(0);
  const [ testRunning, setTestRunning ] = useState(false);
  
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/events');
    eventSource.onmessage = (event) => {
        const { stage, progress } = JSON.parse(event.data);
        setTestProgress( progress );
    };
    return () => {
      eventSource.close();
    };
  }, []);


  const runSpeedTest = async () => {
    setDownloadSpeed(null);
    setUploadSpeed(null);
    setPing(null);
    setTestRunning(true);
    setTestProgress(0);

    try {
      const response = await axios.get('http://localhost:5000/run-speedtest');
      const { download_speed, upload_speed, ping } = response.data;
      setDownloadSpeed(download_speed.toFixed(2));
      setUploadSpeed(upload_speed.toFixed(2));
      setPing(ping.toFixed(1));

      setTestRunning(false)

    }
    catch (error) {
      console.error('Error running speed test:', error);
      alert('Failed to run speed test')
      setTestRunning(false);
    }

    // const eventSource = new EventSource('http://localhost:5000/run-speedtest');

    // eventSource.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   setTestProgress(data.progress);

    //   if (data.results) {
    //     setDownloadSpeed(data.results.download_speed.toFixed(2));
    //     setUploadSpeed(data.results.upload_speed.toFixed(2));
    //     setPing(data.results.ping.toFixed(1));
    //     setTestProgress(false);
    //     eventSource.close();
    //   }
    // };

    // eventSource.onerror = (err) => {
    //   console.error('Error running speed test:', err);
    //   alert('Failed to run speed test');
    //   setTestRunning(false);
    //   eventSource.close();
    // }
  }

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
                {!testRunning ? (
                  <button className="start-button" onClick={runSpeedTest}>
                    <span className="start-text">Run Test!</span>  {/* Wrap text in span */}
                  </button>
                ) : (
                  <div className='progress-container'>
                    <div className="progress-bar" style={{ width: `${testProgress}%` }}></div>
                    <div className="speed-display">
                      <p>Download Speed: {downloadSpeed ? `${downloadSpeed} Mbps` : 'Calculating...'}</p>
                      <p>Upload Speed: {uploadSpeed ? `${uploadSpeed} Mbps` : 'Calculating...'}</p>
                      <p>Ping: {ping ? `${ping} ms` : 'Calculating...'}</p>
                    </div>
                  </div>
                )}
                {!testRunning && downloadSpeed && uploadSpeed && ping && (
                  <div className='results'>
                    <p>Download Speed: {downloadSpeed} Mbps</p>
                    <p>Upload Speed: {uploadSpeed} Mbps</p>
                    <p>Ping: {ping} ms</p> 
                    <button className='submit-button' onClick={submitSpeedTest}>Submit</button>
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