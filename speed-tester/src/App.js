import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import logo from './login.png';
import './App.css';

function App() {
  const [ downloadSpeed, setDownloadSpeed ] = useState(null);
  const [ uploadSpeed, setUploadSpeed ] = useState(null);
  const [ ping, setPing ] = useState(null);
  const [ testProgress, setTestProgress ] = useState(0);
  const [ testRunning, setTestRunning ] = useState(false);
  const [ currentStep, setCurrentStep ] = useState('');
  const [ serverInfo, setServerInfo ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  
  useEffect(() => {

    const fetchServerInfo = async () => {
      try {
        const response = await axios.get(`${apiUrl}/server-info`);
        setServerInfo(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching server info:', err);
        setLoading(false)
      }
    };

    fetchServerInfo();

    const ws = new WebSocket(`${apiUrl.replace(/^http/, 'ws')}/events`);
    console.log("WebSocket connection established");
    ws.onmessage = (event) => {
      const { stage, progress } = JSON.parse(event.data);
      setTestProgress( progress );
      switch (stage) {
        case 'config':
          setCurrentStep('Establishing connection to server.');
          break;
        case 'server':
          setCurrentStep('Running download test.');
          break;
        case 'download':
          setCurrentStep('Running upload test.');
          break;
        case 'upload':
          setCurrentStep('Running upload test.');
          break;
        default:
          setCurrentStep('');
      }
    };
    return () => {
      ws.close();
    };
  }, [apiUrl]);


  const runSpeedTest = async () => {
    setDownloadSpeed(null);
    setUploadSpeed(null);
    setPing(null);
    setTestRunning(true);
    setTestProgress(0);
    setCurrentStep('');

    try {
      const response = await axios.get(`${apiUrl}/run-speedtest`);
      const { download_speed, upload_speed, ping } = response.data;
      setDownloadSpeed(download_speed.toFixed(1));
      setUploadSpeed(upload_speed.toFixed(1));
      setPing(ping.toFixed(1));

      setTestRunning(false)

    }
    catch (error) {
      console.error('Error running speed test:', error);
      alert('Failed to run speed test')
      setTestRunning(false);
    }

  }

  const handleLoginClick = (event) => {
    event.preventDefault();
    const link = event.target;
    link.classList.add('animate');
    setTimeout(() => {
      link.classList.remove('animate');
    }, 300); // Duration of the animation
  };

  return (
    <Router basename="/SpeedTester">
      <div className="app">
        <nav className="navbar">
          <div className="left-navbar">
            <a href="/" className="navbar-link">
              <img src="speedtester-round.png" alt="Logo" className="navbar-logo" />
              <span className="title navbar-title">Speedtester</span>
            </a>
          </div>
          <div className="dropdown">
            <img src={logo} alt="Person Icon" className="person-icon" />
            <div className="dropdown-content">
              <a href="#" className="login-link" onClick={handleLoginClick}>
                Login (Coming Soon)
              </a>
              <a href="https://github.com/giovanni-rojas/SpeedTester" target="_blank" rel="noopener noreferrer">
                See Code
              </a>
              <a href="https://giovanni-rojas.github.io/" target="_blank" rel="noopener noreferrer">
                About
              </a>
            </div>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div className="speedtest-container">
                {!testRunning ? (
                  <>
                    <button className="start-button" onClick={runSpeedTest}>
                      <span className="start-text">Run Test!</span>
                    </button>
                    {!loading && serverInfo && (
                      <div className="info-container">
                        <div className="isp-info">
                          <div className="icon-text">
                            <p className="name">{serverInfo.isp}</p>
                            <p className="location">{serverInfo.location}</p>
                          </div>
                          <img src="wifi.jpg" alt="Wifi Icon" className="icon" />
                        </div>
                        <div className="arrows">
                          <div className="arrow">&#8594;</div>
                          <div className="arrow">&#8592;</div>
                        </div>
                        <div className="server-info">
                          <img src="server-round.png" alt="Server Icon" className="icon" />
                          <div className="icon-text">
                            <p className="name">{serverInfo.server.sponsor}</p>
                            <p className="location">{serverInfo.server.location}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="progress-container">
                    <div className="progress-background"></div>
                    <p key={currentStep} className="current-step ellipsis-slow">
                      {currentStep}
                    </p>
                    <div className="progress-bar" style={{ width: `${testProgress}%` }}></div>
                    {!loading && serverInfo && (
                      <div className="info-wrapper">
                        <div className="info-container centered">
                          <div className="isp-info">
                            <div className="icon-text">
                              <p className="name">{serverInfo.isp}</p>
                              <p className="location">{serverInfo.location}</p>
                            </div>
                            <img src="wifi.jpg" alt="Wifi Icon" className="icon" />
                          </div>
                          <div className="arrows">
                            <div className="arrow">&#8594;</div>
                            <div className="arrow">&#8592;</div>
                          </div>
                          <div className="server-info">
                            <img src="server-round.png" alt="Server Icon" className="icon" />
                            <div className="icon-text">
                              <p className="name">{serverInfo.server.sponsor}</p>
                              <p className="location">{serverInfo.server.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="speed-display">
                      <p className="ellipsis-fast">
                        Download Speed:{downloadSpeed ? `${downloadSpeed} Mbps` : ''}
                      </p>
                      <p className="ellipsis-fast">
                        Upload Speed:{uploadSpeed ? `${uploadSpeed} Mbps` : ''}
                      </p>
                      <p className="ellipsis-fast">Ping:{ping ? `${ping} ms` : ''}</p>
                    </div>
                  </div>
                )}
                {!testRunning && downloadSpeed && uploadSpeed && ping && (
                  <>
                    <div className="results-container">
                      <div className="results-content">
                        <div className="results-values">
                          <div>{downloadSpeed}</div>
                          <div>{uploadSpeed}</div>
                          <div>{ping}</div>
                        </div>
                        <div className="results-labels">
                          <div className="download">Mbps</div>
                          <div className="upload">Mbps</div>
                          <div className="ping">Ping</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            }
          />
          {/* Add routes for login and register */}
        </Routes>
        <footer className="footer">
          <p>
            Compare to results on{' '}
            <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer">
              speedtest.net
            </a>
            !
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;