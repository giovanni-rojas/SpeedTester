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
  const [ currentStep, setCurrentStep ] = useState('');
  const [ serverInfo, setServerInfo ] = useState(null);
  
  useEffect(() => {

    const fetchServerInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/server-info');
        setServerInfo(response.data);
      } catch (err) {
        console.error('Error fetching server info:', err);
      }
    };

    fetchServerInfo();

    const eventSource = new EventSource('http://localhost:5000/events');
    eventSource.onmessage = (event) => {
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
      eventSource.close();
    };
  }, []);


  const runSpeedTest = async () => {
    setDownloadSpeed(null);
    setUploadSpeed(null);
    setPing(null);
    setTestRunning(true);
    setTestProgress(0);
    setCurrentStep('');

    try {
      const response = await axios.get('http://localhost:5000/run-speedtest');
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
          <div className='left-navbar'>
            <a href="/" className="navbar-link">
              <img src="speedtester-logo.jpg" alt="Logo" className="navbar-logo"/>
              <span className="title navbar-title">Speedtester</span>
            </a>
          </div>
          <div className='dropdown'>
            <img src={logo} alt="Person Icon" className='person-icon' />
            <div className='dropdown-content'>
              <a href="/">Login (Coming Soon)</a>
              <a href="https://github.com/giovanni-rojas/SpeedTester" target="_blank" rel="noopener noreferrer">See Code</a>
              <a href="https://giovanni-rojas.github.io/" target="_blank" rel="noopener noreferrer">About Author</a>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={(
            <div className="speedtest-container">
              {!testRunning ? (
                <button className="start-button" onClick={runSpeedTest}>
                  <span className="start-text">Run Test!</span>
                </button>
              ) : (
                <div className='progress-container'>
                  <div className='progress-background'></div>
                  <p key={currentStep} className="current-step ellipsis-slow">{currentStep}</p>
                  <div className="progress-bar" style={{ width: `${testProgress}%` }}></div>
                  <div className="speed-display">
                    <p className='ellipsis-fast'>Download Speed:{downloadSpeed ? `${downloadSpeed} Mbps` : ''}</p>
                    <p className='ellipsis-fast'>Upload Speed:{uploadSpeed ? `${uploadSpeed} Mbps` : ''}</p>
                    <p className='ellipsis-fast'>Ping:{ping ? `${ping} ms` : ''}</p>
                  </div>
                </div>
              )}
              {!testRunning && downloadSpeed && uploadSpeed && ping && (
                <div className="results-container">
                  <div className='results-content'>
                    <div className='results-values'>
                      <div>{downloadSpeed}</div>
                      <div>{uploadSpeed}</div>
                      <div>{ping}</div>
                    </div>
                    <div className='results-labels'>
                      <div className='download'>Mbps</div>
                      <div className='upload'>Mbps</div>
                      <div className='ping'>Ping</div>
                    </div>
                  </div>
                </div>
              )}
              {serverInfo && ( 
                <div className='info-container'>
                  <div className='isp-info'>
                    <div className='icon-text'>
                      <p className='name'>{serverInfo.isp}</p>
                      <p className='location'>{serverInfo.location}</p>
                    </div>
                    <img src="wifi.jpg" alt="Wifi Icon" className='icon'/>
                  </div>
                  <div className='arrows'>
                    <div className='arrow'>&#8594;</div>
                    <div className='arrow'>&#8592;</div>
                  </div>
                  <div className='server-info'>
                    <img src="server.jpg" alt="Server Icon" className='icon'/>
                    <div className='icon-text'>
                      <p className='name'>{serverInfo.server.sponsor}</p>
                      <p className='location'>{serverInfo.server.location}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )} />
          {/* Add routes for login and register */}
        </Routes>
        <footer className='footer'>
          <p>Compare to results on <a href='https://www.speedtest.net/' target="_blank" rel="noopener noreferrer">speedtest.net</a>!</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;